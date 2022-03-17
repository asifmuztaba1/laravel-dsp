<?php

namespace Tests\Unit;

use App\Models\Campaign;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CampaignApiTest extends TestCase
{

    /**
     * A basic unit test example.
     *
     * @return void
     */
    /*
     * Test campaign api end pont
     * test create campaign end point
     * test get campaign list
     * test update endpoint
     * test inputs validation for creat campaign
     *
     */
    public function test_campaign_get_api_end_point_Return_200()
    {
        $this->get('api/campaign')
            ->assertStatus(Response::HTTP_OK);
    }

    public function test_new_campaign_post_api_end_point_Return_200()
    {
        Storage::fake('local');
        $file = UploadedFile::fake()->create('file.jpg');
        $parameters = [
            'campaignName' => 'New Campaign From Test',
            'startDate' => '2022-03-01',
            'endDate' => '2022-03-12',
            'totalBudget' => '78',
            'dailyBudget' => '20.02',
            'creatives'=>[$file]
        ];
        $this->post('api/addcampaign', $parameters)
             ->assertStatus(Response::HTTP_OK);
    }
    public function test_edit_campaign_by_id()
    {
        $campaign = Campaign::factory()->create();

        $parameters = [
            'campaignName' => 'Test Campaign Update'.$campaign->campaign_name,
            'startDate' => '2022-03-01',
            'endDate' => '2022-03-12',
            'totalBudget' => '24',
            'dailyBudget' => '20.02',
        ];
        $this->putJson("api/update-campaign/{$campaign->id}", $parameters)
            ->assertStatus(Response::HTTP_OK);
    }
    public function test_get_campaign_data_by_id()
    {
        $campaign = Campaign::factory()->create();
        $this->get("api/edit-campaign/{$campaign->id}")
            ->assertStatus(Response::HTTP_OK);
    }
}
