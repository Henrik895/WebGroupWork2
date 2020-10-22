$(function() {
    fetchUserInfo().then(function(response) {
        let user = new User(response.firstname, response.lastname, response.email, response.avatar);
        document.getElementById('avatar').src = user.avatar; //Displaying user avatar as soon as we get the image soruce
    }).catch(function() {
        alert('Failed to fetch user data');
    });
});

function fetchUserInfo() {
    return $.get(
        {
            url: 'https://private-anon-223909d41b-wad20postit.apiary-mock.com/users/1',
            success: function(response) {
                return response;
            },
            error: function() {
                alert('Problem occured');
            }
        }
    );
};