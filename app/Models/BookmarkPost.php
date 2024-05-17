<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookmarkPost extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'bookmark_post';
    protected $fillable = [
        'id',
        'user_id',
        'post_id',
    ];
    public function post() {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
