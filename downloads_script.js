const firebaseConfig = {
    apiKey: "AIzaSyCKh4-2pQJbnxCOdQcDjrCvy2d19OciQdw",
    authDomain: "faceattendancerealtime-a45f0.firebaseapp.com",
    databaseURL: "https://faceattendancerealtime-a45f0-default-rtdb.firebaseio.com",
    projectId: "faceattendancerealtime-a45f0",
    storageBucket: "faceattendancerealtime-a45f0.appspot.com",
    messagingSenderId: "616344383118",
    appId: "1:616344383118:web:a09c83d08c1aea827723df",
    measurementId: "G-DW68MV40RX"
};

firebase.initializeApp(firebaseConfig);
var storageRef = firebase.storage().ref();

// Create a reference under which you want to list
var listRef = storageRef.child('Attendance/');

// Find all the prefixes and items.
listRef.listAll().then((res) => {
    res.items.forEach((itemRef) => {
        var arr = itemRef.toString().split("/");
        var name = arr[arr.length - 1].split(".")[0];
        itemRef.getDownloadURL().then((url) => {
            const newNode = document.createElement("li");
            // Creating a hyperlink
            var a = document.createElement('a');
            var link = document.createTextNode(name);
            a.appendChild(link);
            a.href = url;
            //adding hyperlink to newly created li
            newNode.appendChild(a);
            const list = document.getElementById("myList");
            list.insertBefore(newNode, list.children[0]);
        });
    });
});

