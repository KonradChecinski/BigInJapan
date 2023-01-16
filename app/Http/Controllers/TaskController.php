<?php

namespace App\Http\Controllers;

use App\Models\Panel;
use App\Models\Table;
use App\Models\TableUserPermission;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json([
            'status' => true,
            'message' => 'Panel list Successfully',
            'result' => $tasks
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request, Table $table, Panel $panel)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it'
            ], 401);
        }
        $tablePanel = Panel::where('id', '=', $panel->id)->where('table_id', '=', $table->id);

        if($tablePanel->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Panel don\'t exist',
            ], 401);
        }

        $validate = Validator::make($request->all(),
            [
                'name' => 'required|min:3',
                'description' => 'required|string',
                'datetime' => 'required|date',
                'color' => 'required|string|min:6|max:6',
                'marker' => 'required|boolean'
            ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 400);
        }



        $order = Task::where('panel_id', '=', $panel->id)->orderBy('order', 'DESC')->first();
        if(!$order) $order = 1;
        else {
            $order = $order->order;
            $order++;
        }

        $task = new Task;
        $task->panel_id = $panel->id;
        $task->name = $request->name;
        $task->order = $order;
        $task->description = $request->description;
        $task->datetime = $request->datetime;
        $task->color = $request->color;
        $task->marker = $request->marker;
        $task->save();


        return response()->json([
            'status' => true,
            'message' => 'Task Created Successfully',
            'id' => $task->id,
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPanelTasks(Request $request, Table $table, Panel $panel)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it'
            ], 401);
        }

        $tablePanel = Panel::where('id', '=', $panel->id)->where('table_id', '=', $table->id);

        if($tablePanel->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Panel don\'t exist',
            ], 401);
        }

        $tasks = Task::select('id', 'name', 'order', 'description', 'datetime', 'color', 'marker')->where('panel_id', '=', $panel->id)->orderBy('order', 'ASC')->get();

        return response()->json([
            'status' => true,
            'message' => 'Panel\'s tasks list successfully',
            'result' => $tasks,
        ], 200);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Table $table
     * @param Panel $panel
     * @param Task $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Table $table, Panel $panel, Task $task)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it',
            ], 401);
        }
        $tablePanel = Panel::where('id', '=', $panel->id)->where('table_id', '=', $table->id);

        if($tablePanel->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Panel don\'t exist',
            ], 400);
        }

        $panelTask = Task::where('id', '=', $task->id)->where('panel_id', '=', $panel->id);

        if($panelTask->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Task don\'t exist',
            ], 400);
        }

        $validate = Validator::make($request->all(),
            [
                'name' => 'required|min:3',
                'description' => 'required|string',
                'datetime' => 'required|date',
                'color' => 'required|string|min:6|max:6',
                'marker' => 'required|boolean'
            ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 400);
        }



        $task->name = $request->name;
        $task->description = $request->description;
        $task->datetime = $request->datetime;
        $task->color = $request->color;
        $task->marker = $request->marker;
        $task->save();

        return response()->json([
            'status' => true,
            'message' => 'Task update Successfully',
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePanel(Request $request, Table $table, Panel $panel, Task $task)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it',
            ], 401);
        }
        $tablePanel = Panel::where('id', '=', $panel->id)->where('table_id', '=', $table->id);

        if($tablePanel->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Panel don\'t exist',
            ], 400);
        }

        $panelTask = Task::where('id', '=', $task->id)->where('panel_id', '=', $panel->id);

        if($panelTask->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Task don\'t exist',
            ], 400);
        }

        $validate = Validator::make($request->all(),
            [
                'panelId' => [
                    'required',
                    Rule::exists('panels', 'id')->where('table_id', $table->id)
                ],
            ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 400);
        }



        $oldPanelId = $task->panel_id;
        $task->panel_id = $request->panelId;
        $task->order = 999;
        $task->save();
        $this->reorder($oldPanelId);
        $this->reorder($request->panelId);

        return response()->json([
            'status' => true,
            'message' => 'Task\'s panel change Successfully',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, Table $table, Panel $panel, Task $task)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it',
            ], 401);
        }
        $tablePanel = Panel::where('id', '=', $panel->id)->where('table_id', '=', $table->id);

        if($tablePanel->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Panel don\'t exist',
            ], 400);
        }

        $panelTask = Task::where('id', '=', $task->id)->where('panel_id', '=', $panel->id);

        if($panelTask->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Task don\'t exist',
            ], 400);
        }


        Task::destroy($task->id);

        $this->reorder($panel->id);


        return response()->json([
            'status' => true,
            'message' => 'Task delete Successfully',
        ], 200);
    }





    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeOrder(Request $request, Table $table, Panel $panel, Task $task)
    {
        $tableUserPermission = TableUserPermission::where('user_id', '=', $request->user()->id)->where('table_id', '=', $table->id);

        if($tableUserPermission->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'You don\'t have permission to do it',
            ], 401);
        }
        $tablePanel = Panel::where('id', '=', $panel->id)->where('table_id', '=', $table->id);

        if($tablePanel->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Panel don\'t exist',
            ], 400);
        }

        $panelTask = Task::where('id', '=', $task->id)->where('panel_id', '=', $panel->id);

        if($panelTask->count() == 0){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => 'Task don\'t exist',
            ], 400);
        }

        $validate = Validator::make($request->all(),
            [
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
            $task->order = $request->order;
            $task->save();

            $this->reorder($panel->id);

            $taskResult = Task::select('id', 'name', 'order')->find($task->id);

            return response()->json([
                'status' => true,
                'message' => 'Task order update Successfully',
                'result' => $taskResult,
            ], 200);
        }
        else {
            if ($task->order < $request->order) {
                $filteredArray = Task::where('panel_id', '=', $panel->id)->where('order', '>', $task->order)->where('order', '<=', $request->order)->orderBy('order', 'ASC')->get();
                foreach ($filteredArray as $item) {
                    $taskItem = Task::find($item->id);
                    $taskItem->order--;
                    $taskItem->save();
                }
                $task->order = $request->order;
                $task->save();
            }

            if ($task->order > $request->order) {
                $filteredArray = Task::where('panel_id', '=', $panel->id)->where('order', '>=', $request->order)->where('order', '<', $task->order)->orderBy('order', 'ASC')->get();
                foreach ($filteredArray as $item) {
                    $taskItem = Task::find($item->id);
                    $taskItem->order++;
                    $taskItem->save();
                }
                $task->order = $request->order;
                $task->save();
            }

            $this->reorder($panel->id);

            $taskResult = Task::select('id', 'name', 'order')->find($task->id);

            return response()->json([
                'status' => true,
                'message' => 'Task order update Successfully',
                'result' => $taskResult
            ], 200);
        }
    }









    private function reorder($panelId)
    {
        $tasks = Task::select('id', 'name', 'order')->where('panel_id', '=', $panelId)->orderBy('order', 'ASC')->get();
        $order = 1;
        foreach ($tasks as $task) {
            $task->order = $order++;
            $task->save();
        }
    }
}
