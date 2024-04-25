<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $fillable = [
        'user_id',
        'content',
        'location',
        'mode',
        'post_type',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
