<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableUserPermission extends Model
{
    use HasFactory;

    protected $fillable = [
        'table_id',
        'user_id',
        'permission'
    ];

//    protected $hidden = [
//        'id'
//    ];

    public function table(){
        return $this->belongsTo('Table', 'id', 'table_id');
    }
}
