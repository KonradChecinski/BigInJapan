<?php

namespace App\Http\Controllers;

use App\Models\Panel;
use App\Models\Table;
use App\Models\TableUserPermission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PanelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $panels = Panel::all();
        return response()->json([
            'status' => true,
            'message' => 'Panel list Successfully',
            'result' => $panels
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request, Table $table)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it'
            ], 401);
        }

        $validateName = Validator::make($request->all(),
            [
                'name' => 'required|min:3',
            ]);

        if($validateName->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateName->errors()
            ], 400);
        }

        $order = Panel::where('table_id', '=', $table->id)->orderBy('order', 'DESC')->first();
        if(!$order) $order = 1;
        else {
            $order = $order->order;
            $order++;
        }

        $panel = new Panel;
        $panel->table_id = $table->id;
        $panel->name = $request->name;
        $panel->order = $order;
        $panel->save();


        return response()->json([
            'status' => true,
            'message' => 'Panel Created Successfully',
            'id' => $panel->id,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTablePanels(Request $request, Table $table)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it'
            ], 401);
        }

        $panels = Panel::select('id', 'name', 'order')->where('table_id', '=', $table->id)->orderBy('order', 'ASC')->get();

        return response()->json([
            'status' => true,
            'message' => 'Table\'s panel list successfully',
            'result' => $panels,
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, Table $table, Panel $panel)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it',
            ], 401);
        }

//        ?????? TASK
        Panel::destroy($panel->id);

        $this->reorder($table->id);

        return response()->json([
            'status' => true,
            'message' => 'Panel delete Successfully',
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Table $table, Panel $panel)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it'
            ], 401);
        }

        $validate = Validator::make($request->all(),
            [
                'name' => 'required|min:3',
                'order' => 'required|numeric|min:0|max:999'
            ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 400);
        }

        if($request->order == 999 || $request->order == 0)
        {
            $panel->name = $request->name;
            $panel->order = $request->order;
            $panel->save();

            $this->reorder($table->id);

            $panelResult = Panel::select('id', 'name', 'order')->find($panel->id);

            return response()->json([
                'status' => true,
                'message' => 'Panel update Successfully',
                'result' => $panelResult
            ], 200);
        }
        else{
            if($panel->order < $request->order){
                $filteredArray = Panel::where('table_id', '=', $table->id)->where('order', '>', $panel->order)->where('order', '<=', $request->order)->orderBy('order', 'ASC')->get();
                foreach ($filteredArray as $item) {
                    $panelItem = Panel::find($item->id);
                    $panelItem->order--;
                    $panelItem->save();
                }
                $panel->order = $request->order;
                $panel->name = $request->name;
                $panel->save();
            }

            if($panel->order > $request->order){
                $filteredArray = Panel::where('table_id', '=', $table->id)->where('order', '>=', $request->order)->where('order', '<', $panel->order)->orderBy('order', 'ASC')->get();
                foreach ($filteredArray as $item) {
                    $panelItem = Panel::find($item->id);
                    $panelItem->order++;
                    $panelItem->save();
                }
                $panel->order = $request->order;
                $panel->name = $request->name;
                $panel->save();
            }

            $this->reorder($table->id);

            $panelResult = Panel::select('id', 'name', 'order')->find($panel->id);

            return response()->json([
                'status' => true,
                'message' => 'Panel update Successfully',
                'result' => $panelResult
            ], 200);
        }
    }











    private function reorder($tableId)
    {
        $panels = Panel::select('id', 'name', 'order')->where('table_id', '=', $tableId)->orderBy('order', 'ASC')->get();
        $order = 1;
        foreach ($panels as $panel) {
            $panel->order = $order++;
            $panel->save();
        }
    }


}
