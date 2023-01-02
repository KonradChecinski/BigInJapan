<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttachmentToTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'path'
    ];
}
