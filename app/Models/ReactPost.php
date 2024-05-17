<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReactPost extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'react_post';

    protected $fillable = [
        'id',
        'post_id',
        'user_id',
    ];

}
