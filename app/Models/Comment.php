<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'comments';

    protected $fillable = [
        'id',
        'user_id',
        'post_id',
        'content',
        'comment_parent',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->select(['id', 'fullname', 'avatar']);
    }
    public function child()
    {
        return $this->hasMany(Comment::class, 'comment_parent');
    }
    public function reactComment()
    {
        return $this->hasMany(ReactComment::class, 'comment_id');
    }
    public function getTotalReactsAttribute()
    {
        return $this->reactComment()->count();
    }
    public function userReacted($userId)
    {
        return $this->hasOne(ReactComment::class, 'comment_id')->where('user_id', $userId)->first();
    }
}
