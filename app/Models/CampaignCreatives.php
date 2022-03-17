<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignCreatives extends Model
{
    use HasFactory;
    protected $table="campaign_creatives";
    protected $fillable=[
        'campaign_id','file_name','file_path','file_type'
    ];

    public function campaigns()
    {
        return $this->belongsTo(Campaign::class,);
    }
}
