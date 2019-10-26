// Make sure indexedDb is supported before Coding
// Steps involved in using indexedDB
// 1-Open a database
// 2-if it is the first time of creating the database of opening the DB
//  or it is a new verion of the DB. create an object store for this DB
//  this is like defining a sturct for the data ,
// When data is stored, it is tracked with a key...we need to specify What that key is as a
// part of creating the store

// 3 - on a success event, we have to conduct our transations and once done, we close the
//     transactions.

// Start

//data Structure to be stored in the DB

//qiD, questionText, correctAnswer, studentAnswer, result

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webketIndexedDB || window.msIndexedDB;

// if(!window.indexedDB){
//     alert('indexedjDB is not supported in your current browser');
// }else alert('Indexed DB is supported')

let request = window.indexedDB.open("QuizQuestDatabase",1),
    db,
    tx,
    store,
    index;

request.onupgradeneeded = function(e){
    let db = request.result,
        store = db.createObjectStore("QuestionStore",{keyPath: "qID"}),
        index = store.createIndex("questionText","questionText",{unique: false});
        // store = db.createObjectStore("QuestionStore",{autoIncrement: true});
}

request.onerror = function(e){
    console.log('There was an error: '+ e.target.errorCode);
}

request.onsuccess = function(e){
    db = request.result;
    tx = db.transaction("QuestionStore","readwrite");
    store = tx.objectStore('QuestionStore');
    index = store.index('questionText');

    db.onerror = function(e){
        console.log('Error'+ e.target.errorCode);
    }

    // Storing the data 

    // store.put({
    //     qID:1,
    //     questionText: "This sky is blue. ", 
    //     correctAnswer: true,
    //      studentAnswer: true, 
    //      result: true});

    // store.put({
    //     qID: 2,
    //     questionText: "The grass is green",
    //     correctAnswer: true,
    //     studentAnswer: true,
    //     result: true
    // });

    let q1 = store.get(1);
     let qs = index.get("The grass is green");

    q1.onsuccess = function(){
        console.log(q1.result);
        console.log(q1.result.questionText);
    }

    qs.onsuccess = function(){
        console.log(qs.result.questionText);
    }

    tx.oncomplete=function(){
        db.close();
    }
}