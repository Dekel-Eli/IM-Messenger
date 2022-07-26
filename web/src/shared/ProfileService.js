
export const profileService = (props) => {
    var func = props?.func;
    var profile = props?.profile;
    return func(profile);
};

export const isProfileEnrolled = (profile) => {
    return fooProfiles?.filter(p => p?.password === profile?.password &&
        p?.username === profile?.username);
};

export const EnrollProfile = (profile) => {

    // check that username is not taken
    if (fooProfiles?.filter(p => p?.username === profile?.username).length > 0) {
        return null;
    }
    // check that nickname is not taken
    if (fooProfiles?.filter(p => p?.nickname === profile?.nickname).length > 0) {
        return null;
    }

    // if all true, create profile 
    const newProfile = { ...profile, id: maxId() + 1, chatsIds: [] };
    // add profile to fooProfiles
    fooProfiles?.push(newProfile);
    // return new profile's id
    return newProfile;
}

export const getProfile = (profileId) => {
    return fooProfiles?.filter(p => p?.id === profileId)[0];
}

export const getContacts = (profileId) => {
    return fooProfiles.map(profile => ({
        id: profile.id,
        nickname: profile.id === profileId ? "You👻" : profile.nickname
    })
    );
}




export const addChatToProfile = (profileIds, chatId) => {
    profileIds.forEach(profileId => {
        let profile = getProfile(profileId);
        profile.chatsIds?.push(chatId);
    });
}


const maxId = () => {
    return fooProfiles?.length > 0 ? Math.max(...fooProfiles.map(profile => profile.id)) : 0;
}

let fooProfiles = [
    {
        id: 1,
        username: "admin",
        nickname: "admeme",
        password: "admin",
        chatsIds: [1, 2, 3, 4, 5],
        photo: "profile_pic/admin_prof_pic.jpg"

    },
    {
        id: 2,
        username: "mememan",
        nickname: "meme man",
        password: "meMeMan!1",
        chatsIds: [1],
        photo: "profile_pic/meme_man_prof_pic.png"

    },
    {
        id: 3,
        username: "notsureif",
        nickname: "not sure if",
        password: "notSureIf!1",
        chatsIds: [2],
        photo: "profile_pic/not_sure_if_prof_pic.jpg"

    },
    {
        id: 4,
        username: "pepefrog",
        nickname: "pepe",
        password: "pePepepe!1",
        chatsIds: [3],
        photo: "profile_pic/pepe_prof_pic.png"

    },
    {
        id: 5,
        username: "stonedjerry",
        nickname: "jerry",
        password: "jerrYy!1",
        chatsIds: [4],
        photo: "profile_pic/stoned_jerry_prof_pic.png"

    },
    {
        id: 6,
        username: "shreksmith",
        nickname: "Shrek Smith",
        password: "putmywifesnameoutofyourM0th!",
        chatsIds: [5],
        photo: "profile_pic/shrek_smith_prof_pic.jpg"

    },
    {
        id: 7,
        username: "damaribareket",
        nickname: "Bareket",
        password: "Bd1",
        chatsIds: [],
        photo: "profile_pic/pokemon_500.jpg",
    },
    {
        id: 8,
        username: "elidekel",
        nickname: "Dekel",
        password: "De1",
        chatsIds: [],
        photo: "profile_pic/nyan_cat.png"

    },
    {
        id: 9,
        username: "foobob",
        nickname: "Bob Foo",
        password: "Bf1",
        chatsIds: [],
        photo: "profile_pic/shrek_smith_prof_pic.jpg"

    },
    {
        id: 10,
        username: "a",
        nickname: "admin",
        password: "admin",
        chatsIds: [],
        photo: "profile_pic/Pokemon_500.jpg"

    },
    {
        id: 11,
        username: "foobar",
        nickname: "Bar Foo",
        password: "Bf1",
        chatsIds: [],
        photo: "profile_pic/shrek_smith_prof_pic.jpg"

    },
];