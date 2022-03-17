<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CampaignCreatives;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $campaign=Campaign::with('creatives')->get();
        if($campaign){
            return response()->json([
                'status'=>200,
                "campaign"=>$campaign,
            ]);
        }
        return response()->json([
            'status'=>404,
            "campaign"=>$campaign,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $campaign=new Campaign();
        $campaign->campaign_name=$request->input('campaignName');
        $campaign->start_date=$request->input('startDate');
        $campaign->end_date=$request->input('endDate');
        $campaign->total_budget=$request->input('totalBudget');
        $campaign->daily_budget=$request->input('dailyBudget');
        $rules = [
            'campaignName' => 'required',
            'startDate'    => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'totalBudget' => 'required|numeric',
            'dailyBudget' => 'required|numeric',
        ];
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {

            return response()->json([
                'status' => 405,
                'message' => $validator->errors()->first()
            ]);
        }
        if($campaign->save()) {
            if ($request->file('creatives'))
                $this->handleImageUploadUpdate($request, $campaign);
            return response()->json([
                'status' => 201,
                'message' => 'Campaign Data Added Successfully'
            ]);
        }
        return response()->json([
            'status' => 400,
            'message' => 'Campaign Not Created'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function show(Campaign $campaign)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        $campaign=Campaign::with('creatives')->find($id);
        if($campaign)
            return response()->json([
                'status'=>200,
                'campaign'=>$campaign
            ]);
        return response()->json([
            'status'=>404,
            'message'=>"Campaign Data Not Found"
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Campaign  $campaign
     * @return string
     */
    public function update(Request $request, $id)
    {
        $campaign=Campaign::find($id);
        if( !$campaign){
            return response()->json([
                'status'=>404,
                'campaign'=>"Campaign Data Not Found"
            ]);
        }
        $campaign->campaign_name=$request->input('campaignName');
        $campaign->start_date=$request->input('startDate');
        $campaign->end_date=$request->input('endDate');
        $campaign->total_budget=$request->input('totalBudget');
        $campaign->daily_budget=$request->input('dailyBudget');
        $imageToDelete=$request->input('imagetodel');
        if(!empty($imageToDelete)){ //checking images to delete
            foreach($imageToDelete as $im){
                CampaignCreatives::where('id',$im)->delete();
            }
        }
        if ($request->file('creatives'))
            $this->handleImageUploadUpdate($request, $campaign); //upload new images
       if( $campaign->update()){
           return response()->json([
               'status'=>200,
               'message'=>"Campaign Data Updated",
               'campaign'=>$campaign,
           ]);
       }
        return response()->json([
            'status'=>404,
            'campaign'=>"Campaign Data Not Updated"
        ]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function destroy(Campaign $campaign)
    {
        //
    }

    /**
     * @param Request $request
     * @param Campaign $campaign
     * @return void
     */
    public function handleImageUploadUpdate(Request $request, Campaign $campaign): void
    {
            foreach ($request->file('creatives') as $f) {
                $creative = new CampaignCreatives();
                $creative->campaign_id = $campaign->id;
                $creative->file_name = $f->getClientOriginalName();
                $creative->file_path = 'storage/app/public/' . $creative->file_name;
                $creative->file_type = $f->getClientMimeType();
                $f->storeAs('public', $creative->file_name);
                $creative->save();
            }
    }
}
