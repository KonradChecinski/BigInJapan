<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Models\TableUserPermission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tables = Table::all();
        return response()->json([
            'status' => true,
            'message' => 'Table list Successfully',
            'result' => $tables
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $validateName = Validator::make($request->all(),
            [
                'name' => 'required|min:5',
            ]);

        if($validateName->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateName->errors()
            ], 401);
        }



        $table = new Table;
        $table->name = $request->name;
        $table->background = $this->random_color();
        $table->save();


//        $table = Table::crete([
//            'name' => $request->name,
//            'background' => $this->random_color(),
//        ]);

        $tableUserPermission = TableUserPermission::create([
            'table_id' => $table->id,
            'user_id' => $request->user()->id,
            'permission' => 2
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Table Created Successfully',
            'id' => $table->id,
        ], 200);
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\JsonResponse
    */
    public function getUserTable(Request $request)
    {
        $usersTables = TableUserPermission::select('tables.name', 'table_user_permissions.table_id', 'table_user_permissions.permission')->join('tables', 'table_user_permissions.table_id', '=', 'tables.id')->where('table_user_permissions.user_id', '=', $request->user()->id)->where('table_user_permissions.permission', '=', 2)->get();
        $sharedTables = TableUserPermission::select('tables.name', 'table_user_permissions.table_id', 'table_user_permissions.permission')->join('tables', 'table_user_permissions.table_id', '=', 'tables.id')->where('table_user_permissions.user_id', '=', $request->user()->id)->whereIn('table_user_permissions.permission', [0,1])->get();
        return response()->json([
            'status' => true,
            'message' => 'User\'s Table list Successfully',
            'result' => [$usersTables,$sharedTables]
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTableInfo(Request $request, Table $table)
    {
        $tableOwner = TableUserPermission::select(DB::raw("CONCAT(users.name, ' (#', users.unique_name, ')') AS full_name"), 'users.name', 'users.unique_name')->join('users', 'table_user_permissions.user_id', '=', 'users.id')->where('table_id' , '=', $table->id)->where('permission', '=', 2)->first();
        return response()->json([
            'status' => true,
            'message' => 'Table\'s name list successfull',
            'result' => [
                'tableName' => $table->name,
                'tableOwner' => $tableOwner,
            ]
        ], 200);
//        name$table['name']
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSharedUser(Request $request, Table $table)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it'
            ], 400);
        }

        $sharedUsers = TableUserPermission::select(DB::raw("CONCAT(users.name, ' (#', users.unique_name, ')') AS full_name"), 'users.name', 'users.unique_name', 'table_user_permissions.permission')->join('users', 'table_user_permissions.user_id', '=', 'users.id')->where('table_user_permissions.table_id', '=', $table->id)->get();

        return response()->json([
            'status' => true,
            'message' => 'Table\'s name list successfull',
            'result' => $sharedUsers
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function shareTable(Request $request)
    {
        $validateReqest = Validator::make($request->all(),
            [
                'user' => [
                    'required',
                    Rule::exists('users', 'unique_name')
                ],
                'idTable' => [
                    'required',
                    Rule::exists('tables', 'id'),
                    Rule::exists('table_user_permissions', 'table_id')->where('user_id', $request->user()->id)->whereIn('permission', [1,2])
                ],
                'permission' => 'required|numeric|min:0|max:1',
            ]);

        if($validateReqest->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateReqest->errors()
            ], 401);
        }
        $userId = User::where('unique_name', '=', $request->user)->first()->id;

        $tableUserPermission = TableUserPermission::where('user_id', '=', $userId)->where('table_id', '=', $request->idTable)->get();

        if($tableUserPermission->count() > 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'User have right to this table'
            ], 400);
        }


        $tableUserPermission = TableUserPermission::create([
            'table_id' => $request->idTable,
            'user_id' => $userId,
            'permission' => $request->permission,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User add succesfully',
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateSharedUser(Request $request, Table $table)
    {
        $validateReqest = Validator::make($request->all(),
            [
                'user' => [
                    'required',
                    Rule::exists('users', 'unique_name')
                ],
                'permission' => 'required|numeric|min:0|max:1',
            ]);

        if($validateReqest->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateReqest->errors()
            ], 400);
        }

        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id)->whereIn('permission', [1,2]);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it'
            ], 400);
        }
        $userId = User::where('unique_name', '=', $request->user)->first()->id;
        $tableUserPermission = TableUserPermission::where('table_id', '=', $table->id)->where('user_id', '=', $userId)->first();

        $tableUserPermission->permission = $request->permission;
        $tableUserPermission->save();

        return response()->json([
            'status' => true,
            'message' => 'User permission change succesfully',
        ], 200);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */


    public function deleteSharedUser(Request $request, Table $table)
    {
        $validateReqest = Validator::make($request->all(),
            [
                'user' => [
                    'required',
                    Rule::exists('users', 'unique_name')
                ],
            ]);

        if($validateReqest->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateReqest->errors()
            ], 400);
        }

        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id)->whereIn('permission', [1,2]);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it'
            ], 400);
        }
        $userId = User::where('unique_name', '=', $request->user)->first()->id;
        TableUserPermission::where('table_id', '=', $table->id)->where('user_id', '=', $userId)->delete();

        return response()->json([
            'status' => true,
            'message' => 'User delete succesfully',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateName(Request $request, Table $table)
    {
        $validateName = Validator::make($request->all(),
            [
                'name' => 'required|min:5',
            ]);

        if($validateName->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateName->errors()
            ], 400);
        }

        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id)->whereIn('permission', [1,2]);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it'
            ], 400);
        }

        $table->name = $request->name;
        $table->save();

        return response()->json([
            'status' => true,
            'message' => 'Table name change successfull',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        $tables = TableUserPermission::select('table_id')->where('user_id', '=', $request->user()->id)->where('table_id', '=', $id)->where('permission', '=', '1')->get();
        if($tables->isEmpty()){
            return response()->json([
                'status' => false,
                'message' => 'Cannot delete tables',
            ], 403);
        }


        TableUserPermission::where('table_id', '=', $id)->delete();
        Table::destroy($id);

        return response()->json([
            'status' => true,
            'message' => 'Table delete Successfully',
        ], 200);
    }







    private function random_color_part(): string
    {
        return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
    }

    private function random_color(): string
    {
        return $this->random_color_part() . $this->random_color_part() . $this->random_color_part();
    }

}
