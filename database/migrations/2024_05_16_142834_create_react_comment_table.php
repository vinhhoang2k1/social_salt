<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('react_comment', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->char('post_id', 26);
            $table->char('user_id', 26);
            $table->char('comment_id', 26);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('react_comment');
    }
};
