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

    public function medias()
    {
        return $this->hasMany(PostMedia::class, 'post_id', 'id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'id');
    }
    public function getTotalCommentsAttribute()
    {
        return $this->comments()->count();
    }

    public function reactPost()
    {
        return $this->hasMany(ReactPost::class, 'post_id');
    }
    
    public function reacted($userId)
    {
        return $this->hasOne(ReactPost::class, 'post_id')->where('user_id', $userId)->first();
    }

    public function getTotalReactsAttribute()
    {
        return $this->reactPost()->count();

    }
    public function bookmarked($userId)
    {
        return $this->hasOne(BookmarkPost::class, 'post_id')->where('user_id', $userId)->first();
    }
}
