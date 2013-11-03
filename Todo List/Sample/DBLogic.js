
var db;
var tasksList = "";

$(function() {

	if("indexedDB" in window) {
        console.log("indexedDB is supported.");
    } else {	
        console.log("indexedDB isn't supported.");
        return;
    }

    var openRequest = indexedDB.open("TasksDB", 12);

    openRequest.onupgradeneeded = function(e){
    	console.log('upgrading'+e);
    	
    	thisDB = e.target.result;

    	debugger;
    	if(!thisDB.objectStoreNames.contains("TasksDB")) {
                thisDB.deleteObjectStore("TasksDB");
                thisDB.createObjectStore("TasksDB" ,{keyPath:"id"} );
                // thisDB.createIndex('IndexOnIdForSortingInDesc', ['id'], {unique: false});
        }
    }

    openRequest.onsuccess = function(e){
    	console.log('Success'+e);
    	db = e.target.result;

        /*Loads all the tasks into the Buffer-String 'tasksList'*/
        getAllTasks();
    }

    openRequest.onerror = function(e){
    	console.log('error: '+e.target.error.name);
    }
});


/**
 *	Adds a task to the DB.
 *  If a task with same Id is already available in the DB, then update it.
 */
function addOrUpdateTask(taskId, taskObj){

	var transaction = db.transaction(["TasksDB"], "readwrite");
	var tasksObjStore = transaction.objectStore("TasksDB");
    
    /*Try to add the task. If a task already exists, update the existing Task*/
    var request = tasksObjStore.add( taskObj );
    request.onsuccess = function(e){
        console.log("Task is Added");
    }
	request.onerror = function(e){
		console.log("Error on adding the task: "+e.target.error.name);
        var transaction = db.transaction(["TasksDB"], "readwrite");
        var tasksObjStore = transaction.objectStore("TasksDB");
        debugger;
        var req = tasksObjStore.put( taskObj );
        req.onsuccess = function(e) {
            console.log("Updated successfully.");
        }
        req.onerror = function(e) {
            console.log("Updation failed.");
        }
	}
}

/**
 *	Fetches the task, based on the task-Id.
 */
function getTask( taskId ){

	var transaction = db.transaction(["TasksDB"], "readonly");
	var tasksObjStore = transaction.objectStore("TasksDB");

	var taskObj = tasksObjStore.get( parseInt(taskId) );

	request.onerror = function(e){
		console.log("Error on adding the task: "+e.target.error.name);
	}

	request.onsuccess = function(e){
		console.log("Task is Retrieved");
		var result = e.target.result;
		console.dir(result);
		if(result) {
            for(var field in result) {
                console.log(field + " : " + result[field]);
            }
        } 
        else {
            console.log("No records found.");
        }   
	}
}

/**
 *  Get the list of all the tasks.
 */
function getAllTasks(e) {
    
    var taskName, taskDescription;

    debugger;
    db.transaction(["TasksDB"], "readonly")
        .objectStore("TasksDB").openCursor()
        .onsuccess = function(e) {
            var cursor = e.target.result;
            if(cursor){
                console.log("Cursor Key: " + cursor.key);

                tasksList += '<li class="task"><span class="tiles"  TaskId="'+cursor.key+'">'
                                    + '<div class="Name">'+cursor.value['name']+'</div>'
                                    + '<div class="Description">'+cursor.value['description']+'</div>'
                                    + '<div class="taskTime">'+cursor.value['taskTime']+'</div>'
                                    + '</span></li>';
                console.log("-----------");
                cursor.continue();
            }
            debugger;
        }
}

/**
 *  Delete a task, based on the Id.
 */
 function deleteTask( taskId ) {
     
    var objectStore = db.transaction(["TasksDB"], "readwrite")
                            .objectStore("TasksDB");

    var request = objectStore.delete( parseInt(taskId) );
    request.onsuccess = function(e) {
        console.log("Deleted Successfully");
    };
    request.onerror = function(){
        console.log("Deletion failed.");
    };
 }
