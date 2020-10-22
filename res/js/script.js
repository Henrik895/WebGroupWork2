$(function() {
    fetchUserInfo().then(function(response) {
        let user = new User(response.firstname, response.lastname, response.email, response.avatar);
        updateUserInfo(user);
    }).catch(function() {
        alert('Failed to fetch user data');
    });

    $('#avatar').click(function() {
        userDropDown();
    })
});

function updateUserInfo(user) {
    $('#avatar').attr('src', user.avatar);
    $('#user-name').html(user.firstname + " " + user.lastname);
    $('#user-email').html(user.email);
}

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

function userDropDown() {
    if ($('#user-dropdown').css('display') === 'none') {
        $('#user-dropdown').css('display', 'inline');
    } else {
        $('#user-dropdown').css('display', 'none');
    }
}