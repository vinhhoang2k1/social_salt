<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostMedia extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'post_media';

    protected $fillable = [
        'id',
        'post_id',
        'type',
        'caption',
        'media_path',
    ];
}
