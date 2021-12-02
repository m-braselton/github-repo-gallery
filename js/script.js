//targetting the div where your profile info will appear.
const overView = document.querySelector(".overview");
const username = "m-braselton";

//create and name an async function to fetch info from github
const githubProfile = async function() {
  const showRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await showRequest.json();
    userInfo(data);
};
githubProfile();

//function to display the fetched user information
const userInfo = function(data) {
  var div = document.createElement("div");
  div.classList.add ("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
  overView.append(div);
};
