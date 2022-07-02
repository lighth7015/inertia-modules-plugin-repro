<?php namespace Modules\Myapp\Http\Controllers;

use Illuminate\Http\Request as HttpRequest,
	Illuminate\Routing\Controller,
	Inertia\Inertia;

class MyappController extends Controller {

	/**
	 * Display a listing of the resource.
	 */
	public function index(HttpRequest $request) {
		return Inertia::render('welcome');
	}
}
