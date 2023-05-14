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

var rollV, nameV, branchV, emailV, fileItem, storageRef = firebase.storage().ref();

function readFom() {
    rollV = document.getElementById("roll").value;
    nameV = document.getElementById("name").value;
    branchV = document.getElementById("branch").value;
    emailV = document.getElementById("email").value;
    fileItem = document.getElementById("image").files[0];
}



document.getElementById("insert").onclick = function (e) {
    readFom();
    e.preventDefault();
    firebase
        .database()
        .ref("student/" + rollV)
        .set({
            rollNo: rollV,
            name: nameV,
            branch: branchV,
            email: emailV,
        });
    firebase
        .database()
        .ref("student/" + "flag")
        .set({
            change: 1
        });
    var img = storageRef.child("images/" + rollV + ".jpg");
    img.put(fileItem);
    alert("Data Inserted");
    document.getElementById("roll").value = "";
    document.getElementById("name").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("email").value = "";
};

document.getElementById("read").onclick = function (e) {
    readFom();
    e.preventDefault();
    firebase
        .database()
        .ref("student/" + rollV)
        .on("value", function (snap) {
            document.getElementById("roll").value = snap.val().rollNo;
            document.getElementById("name").value = snap.val().name;
            document.getElementById("branch").value = snap.val().branch;
            document.getElementById("email").value = snap.val().email;
        });
};

document.getElementById("update").onclick = function (e) {
    readFom();
    e.preventDefault();
    firebase
        .database()
        .ref("student/" + rollV)
        .update({
            name: nameV,
            branch: branchV,
            email: emailV,
        });
    firebase
        .database()
        .ref("student/" + "flag")
        .set({
            change: 1
        });
    var img = storageRef.child("images/" + rollV + ".jpg");
    img.put(fileItem);
    alert("Data Update");
    document.getElementById("roll").value = "";
    document.getElementById("name").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("email").value = "";
};
document.getElementById("delete").onclick = function (e) {
    readFom();
    e.preventDefault();
    firebase
        .database()
        .ref("student/" + rollV)
        .remove();
    firebase
        .database()
        .ref("student/" + "flag")
        .set({
            change: 1
        });
    var img = storageRef.child("images/" + rollV + ".jpg");
    img.delete();
    alert("Data Deleted");
    document.getElementById("roll").value = "";
    document.getElementById("name").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("email").value = "";
};
