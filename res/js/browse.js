$("document").ready(function () {

    const followClass = "following";
    const followEndpoint = "";
    const unfollowEndpoint = "";

    getAllProfiles();

    function getAllProfiles() {
        $.get("https://private-anon-441f1bf923-wad20postit.apiary-mock.com/profiles", (profiles) => {
            profiles.forEach((profile) => {
                $("#profiles-container").append(getProfileHtml(profile));
                let profileFollowButtonId = "#" + getFollowProfileButtonId(profile)
                $(profileFollowButtonId).click(function() {
                    if ($(this).hasClass(followClass)) {
                        followClicked(profile, unfollowEndpoint).then((result) => {
                            if (result === true) {
                                $(this).text("Follow");
                                $(this).removeClass(followClass);
                            }
                        })
                    } else {
                        // Not following yet.
                        followClicked(profile, followEndpoint).then((result) => {
                            if (result === true) {
                                $(this).text("Unfollow");
                                $(this).addClass(followClass);
                            }
                        });
                    }

                });
            })
        }).fail(() => {
                console.error("Profiles endpoint not available.");
            })
    }

    function getProfileHtml(profileInfo) {
        let fullname = profileInfo.firstname + " " + profileInfo.lastname;
        let html = `<div class="profile">
                    <div class="profile-image">
                        <img src="${profileInfo.avatar}" alt="${fullname}">
                    </div>
                    <span class="profile-name">${fullname}</span>
                    <button type="button" class="btn-purple btn-medium" id="${getFollowProfileButtonId(profileInfo)}">Follow</button>
                </div>`;
        return html;
    }

    // Currently not working correctly, since relevant endpoints or info is not available yet.
    async function followClicked(profile, endpoint) {
        let result = null;
        // Send post request that current user follows this profile now.
        if (profile !== null) {
            // At one point there's probably an ID for the profile which could be used instead.
            let data = {
                currentUserId: getCurrentUserId(),
                followPersonFirstname: profile.firstname,
                followPersonLastname: profile.lastname
            }

            // Fill with relevant endpoint when one becomes available.
            await sendPostRequest(endpoint, data).then((response) => {
                result = response;
            });
        } else {
            result = false;
        }
        return result;
    }

    async function sendPostRequest(endpoint, data) {
        // Since endpoints don't work yet, just return true for visualization purposes.
        return true;


        let result = null;
        await $.post(endpoint, data, function (responseCode) {
            // if (responseCode === 200) {
            //     return true;
            // }
            result = true;
        }).fail(() => {
            // TODO: Display error to the user.
            result = false;
        })
        return result;
    }

    function getFollowProfileButtonId(profile) {
        return "profile-" + profile.firstname + "-" + profile.lastname + "-button";
    }

    function getCurrentUserId() {
        // Placeholder.
        return 1;
    }

});