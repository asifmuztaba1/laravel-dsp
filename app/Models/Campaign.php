<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;
    protected $table="campaigns";
    protected $fillable=[
        "campaign_name",
        "start_date",
        "end_date",
        "total_budget",
        "daily_budget",
    ];

    public function creatives()
    {
        return $this->hasMany(CampaignCreatives::class);
    }
}
