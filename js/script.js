//targetting the div where your profile info will appear.
const overView = document.querySelector(".overview");
const username = "m-braselton";
const repoList = document.querySelector(".repo-list");

//create and name an async function to fetch info from github
const githubProfile = async function() {
  const showRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await showRequest.json();
    userInfo(data);
};
githubProfile();

//function to display the fetched user information
//create a div to contain user information
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
  fetchRepos();

};
//async function to get list of users repos
const fetchRepos = async function() {
  const showRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await showRepos.json();
    //console.log(repos);
    displayInfo(repoData);
};
//create function to display info from each repo.
const displayInfo = function(repos) {
  //give each (loop) repo a class of "repo" and an <h3> element with name of repo
  for(const repo of repos) {
     const repoItem = document.createElement("li");
     repoItem.classList.add("repo");
     repoItem.innerHTML = `<h3>${repo.name}</h3>`;
     repoList.append(repoItem);
  }
};
