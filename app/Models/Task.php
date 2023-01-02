<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'panels_id',
        'order',
        'name',
        'description',
        'datetime',
        'color',
        'marker'
    ];
}
