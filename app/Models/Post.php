<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model 
{
    use HasFactory, HasUlids;

    protected $table = 'posts';

    protected $fillable = [
        'id',
        'user_id',
        'content',
        'location',
        'mode',
        'post_type',
        'st_public'
    ];

    public function createBy()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function medias() {
        return $this->hasMany(PostMedia::class, 'post_id', 'id');
    }
    public function comments() {
        return $this->hasMany(Comment::class, 'post_id', 'id');
    }
}
