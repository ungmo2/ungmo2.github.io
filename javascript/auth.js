firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(`🎉🎉🎉 ${user.email} is signed in. 🎉🎉🎉`);
    document.body.style.display = 'block';
  } else {
    location.href = '/fastcampus/signin';
  }
});
