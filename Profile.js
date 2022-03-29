import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      userData: null
    }
  }

  loadUserData(){
    this.fetchID = fetchUserData(this.props.username, (userData) => {
      this.setState({ userData });
    });
  }

  componentWillMount(){
    this.loadUserData();
  }

  render() {
    let isLoading;
this.state.userData === null? isLoading=true: isLoading= false;

let name;
let bio;
let friends;
let profilePic;
if(isLoading === true){
  name = 'Loading...';
  bio = 'Loading...';
  friends = [];
}
else{
  name=this.state.userData.name;
  bio = this.state.userData.bio;
  friends = this.state.userData.friends;
  profilePic = <img src={this.state.userData.profilePictureUrl} alt="" />
} 
    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }

    return (
      <div className={className}>
      <div className="profile-picture">{profilePic}</div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }

  componentWillUnmount(){
    cancelFetch(this.fetchID);
  }

  componentDidUpdate(prevProps){
    if(this.props.username !== prevProps.username){
      cancelFetch(this.fetchID);
      this.loadUserData();
    }
  }
}