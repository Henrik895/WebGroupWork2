$(function() {
    fetchUserInfo().then(function(response) {
        updateUserInfo(response);
    }).catch(function() {
        alert('Failed to fetch user data');
    });

    $('#avatar').click(function() {
        userDropDown();
    })
});

function updateUserInfo(response) {
    $('#avatar').attr('src', response.avatar);
    $('#user-name').html(response.firstname + " " + response.lastname);
    $('#user-email').html(response.email);
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