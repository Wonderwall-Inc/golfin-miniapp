import { CSSProperties, Dispatch, SetStateAction } from "react"

export interface TitleComponentProps {
    titlename: string
    style?: CSSProperties
}

export interface AccountType {
    id: number
    app_info?: UserAppInfoType
    personal_info?: UserPersonalInfoType
    telegram_info?: UserTelegramInfoType
    created_at?: string
    updated_at?: string
    custom_logs?: object
}

export interface UserContextType {
    account: undefined | UserType
    setAccount: Dispatch<SetStateAction<undefined | UserType>>
    isWaitingUser: boolean
    setIsWaitingUser: Dispatch<SetStateAction<boolean>>
}


// USER
export interface UserBaseType {
    username: string
    telegram_id: string
    token_balance: string
    is_active: boolean
    is_premium: boolean

}

export interface UserPersonalInfoType {
    location: string
    nationality: string
    age?: number
    gender?: string
    email?: string

}

export interface UserTelegramInfoType {
    username: string
    telegram_id: string
    token_balance: number
    is_premium: boolean
    wallet_address?: string
    chat_id: string,
    start_param?: string

}

export interface UserAppInfoType {
    is_active: boolean
    in_game_items?: object
    is_admin?: boolean
    skin: string[]
    custom_logs?: object
}


export interface UserUpdateDetailsType {
    token_balance?: number
    is_active?: boolean
    is_premium?: boolean
    in_game_items?: object
    skin?: string[]
    location?: string
    age?: number
    custom_logs?: object
}


export interface UserType {
    id: number
    app_info: UserAppInfoType
    personal_info: UserPersonalInfoType
    telegram_info: UserTelegramInfoType
    created_at: string
    updated_at: string
    custom_logs?: object
}


export interface UserDetailsType {
    user_base: UserType
    game_characters?: GameCharacterBaseType[]
    point?: PointType[]
    activity?: ActivityBaseType[]
    social_media?: SocialMediaBaseType[]
    sender?: FriendBaseType[]
    receiver?: FriendBaseType[]
}



export interface UserCreateRequestType {
    access_token?: string
    app_info: UserAppInfoType
    personal_info: UserPersonalInfoType
    telegram_info: UserTelegramInfoType
}


export interface UserCreateResponseType {
    access_token?: string
    user_details: UserDetailsType
}


export interface UserRetrievalRequestType {
    access_token: string
    id?: string
    username?: string
    telegram_id?: string
    wallet_address?: string
    // personal_info: UserPersonalInfoType
}


export interface UserRetrievalResponseType {
    user_details: UserDetailsType
}

export interface UserUpdateRequestType {
    id: number
    access_token: string
    user_payload?: UserUpdateDetailsType
}


export interface UserUpdateResponseType {
    user_details: UserDetailsType
}


export interface UserDetailsResponseType {
    user_details: UserDetailsType
}

// GAME CHARACTER
export interface GameCharacterBaseType {
    id: number
    first_name: string
    last_name: string
    gender: number
    title: string
    created_at: string
    updated_at: string
    custom_logs?: object
}


export interface GameCharacterStatBaseType {
    id: number
    level: number
    exp_points: number
    stamina: number
    recovery: number
    condition: number
}



export interface GameCharacterStatsType {
    id: number
    level: number
    exp_points: number

    stamina: number
    recovery: number
    condition: number
    created_at: string
    updated_at: string
    custom_logs?: object
}



export interface GameCharacterType {
    id: number
    first_name: string
    last_name: string
    gender: number
    title: string
    created_at: string
    updated_at: string
    custom_logs?: object
}


export interface GameCharacterDetailsType {
    game_character_base: GameCharacterType
    // # user_id: number
}


export interface GameCharacterStatDetailsType {
    game_character_stat_base: GameCharacterStatsType
    game_character_id?: number
}


export interface GameCharacterCreateDetailsType {
    first_name: string
    last_name: string
    gender: number
    title: string
    custom_logs?: object
}


export interface GameCharacterUpdateDetailsType {
    first_name?: string
    last_name?: string
    gender?: number
    title?: string
    custom_logs?: object
}


export interface GameCharacterStatsUpdateDetailsType {
    level?: number
    exp_points?: number
    stamina?: number
    recovery?: number
    condition?: number
    custom_logs?: object
}


export interface GameCharacterCreateRequestType {
    user_id: number
    access_token: string
    character_details: GameCharacterCreateDetailsType
}



export interface GameCharacterCreateResponseType {
    game_character_id: number
    character_stats: GameCharacterStatsType
}

export interface GameCharacterRetrievalRequestType {
    access_token: string
    id: number
    character_details?: GameCharacterDetailsType
}


export interface GameCharacterRetrievalResponseType {
    character_details: GameCharacterDetailsType
    character_stats: GameCharacterStatDetailsType[]
}


export interface GameCharacterStatRetrievalRequestType {
    access_token: string
    id: number
    character_stats?: GameCharacterStatDetailsType
}


export interface GameCharacterStatRetrievalResponseType {
    game_character_id: number
    character_stats: GameCharacterStatsType
}


// FIXME:
export interface GameCharacterUpdateRequestType {
    user_id: number
    access_token: string
    game_character_id: number
    character_details?: GameCharacterUpdateDetailsType
    character_stats?: GameCharacterStatsUpdateDetailsType
}


export interface GameCharacterUpdateResponseType {
    character_details: GameCharacterType
    character_stats: GameCharacterStatsType
}

// POINT
export interface PointType {
    id: number
    amount: number
    extra_profit_per_hour: number
    created_at: string
    updated_at: string
    custom_logs?: object
}


export interface PointDetailsType {
    point: PointType
    user_id?: number
}


export interface PointCreateDetailsType {
    amount?: number
    extra_profit_per_hour?: number
    custom_logs?: object
}


export interface PointCreateRequestType {
    user_id: number
    access_token: string
    point_details: PointCreateDetailsType
}


export interface PointCreateResponseType {
    point_base: PointDetailsType
}


export interface PointRetrievalRequestType {
    id: number
    access_token: string
    user_id?: number
}



export interface PointRetrievalResponseType {
    point_base: PointDetailsType
}

export interface PointUpdateByIdRequestType {
    id: number
    type: string
    access_token: string
    point_payload?: PointCreateDetailsType
}


export interface PointUpdateByUserIdRequestType {
    type: string
    access_token: string
    user_id: number
    point_payload?: PointCreateDetailsType
}


export interface PointUpdateResponseType {
    point_base: PointDetailsType
}


// ACTIVITY

export interface ActivityBaseType {
    id: number
    is_logged_in: boolean
    login_streak: number
    total_logins: number
    last_action_time: string
    last_login_time: string
    created_at: string
    updated_at: string
    custom_logs?: object
}

export interface ActivityType {
    is_logged_in: boolean
    login_streak: number
    total_logins: number
    last_action_time: string
    last_login_time: string
    created_at: string
    updated_at: string
    custom_logs?: object
}

export interface ActivityCreateDetailType {
    custom_logs?: object
}


export interface ActivityUpdateDetailType extends ActivityCreateDetailType {
    is_logged_in?: boolean
    login_streak?: number
    total_logins?: number
    last_action_time?: string
    last_login_time?: string
}


export interface ActivityCreateRequestType {
    user_id: number
    access_token: string
    activity: ActivityCreateDetailType
}


export interface ActivityCreateResponseType {
    user_id: number
    activity: ActivityBaseType
}



export interface ActivityDetailType {
    activity: ActivityBaseType

}

export interface ActivityRetrievalRequestType {
    id: number
    access_token: string
    user_id?: number
}


export interface ActivityRetrievalResponseType {
    user_id: number
    activity: ActivityBaseType
}


export interface ActivityUpdateRequestType {
    id: number
    access_token: string
    user_id?: number
    activity: ActivityUpdateDetailType
}


export interface ActivityUpdateResponseType {
    user_id: number
    activity: ActivityBaseType
}


// SOCIAL MEDIA
export interface YoutubeSocialMediaType {
    youtube_id?: string
    youtube_is_following?: boolean
    youtube_is_viewed?: boolean
    youtube_view_date?: string
}

export interface FacebookSocialMediaType {

    facebook_id?: string
    facebook_is_following?: boolean
    facebook_followed_date?: string
}

export interface InstagramSocialMediaType {
    instagram_id?: string
    instagram_is_following?: boolean
    instagram_follow_trigger_verify_date?: string
    instagram_followed_date?: string
    instagram_tagged?: boolean
    instagram_tagged_date?: string
    instagram_reposted?: boolean
    instagram_reposted_date?: string
}

export interface TelegramSocialMediaType {
    telegram_id?: string
    telegram_is_following?: boolean
    telegram_followed_date?: string
}

export interface XSocialMediaType {
    x_id?: string
    x_is_following?: boolean
    x_followed_date?: string
}

export interface DiscordSocialMedia {
    discord_id?: string
    discord_is_following?: boolean
    discord_followed_date?: string
}

export interface SocialMediaType {

    youtube?: YoutubeSocialMediaType
    facebook?: FacebookSocialMediaType
    instagram?: InstagramSocialMediaType
    telegram?: TelegramSocialMediaType
    x?: XSocialMediaType
    discord?: DiscordSocialMedia

    created_at: string
    updated_at: string
    custom_logs?: object
}

export interface SocialMediaCategrizedBaseType extends SocialMediaType {
    id: number
}

export interface SocialMediaBaseType {
    id: number
    youtube_id?: string
    youtube_is_following?: boolean
    youtube_is_viewed?: boolean
    youtube_view_date?: string

    facebook_id?: string
    facebook_is_following?: boolean
    facebook_followed_date?: string

    instagram_id?: string
    instagram_is_following?: boolean
    instagram_follow_trigger_verify_date?: string
    instagram_followed_date?: string
    instagram_tagged?: boolean
    instagram_tagged_date?: string
    instagram_reposted?: boolean
    instagram_reposted_date?: string

    telegram_id?: string
    telegram_is_following?: boolean
    telegram_followed_date?: string

    x_id?: string
    x_is_following?: boolean
    x_followed_date?: string

    discord_id?: string
    discord_is_following?: boolean
    discord_followed_date?: string

    created_at: string
    updated_at: string
    custom_logs?: object
}

export interface SocialMediaCreateDetailType {
    youtube?: YoutubeSocialMediaType
    facebook?: FacebookSocialMediaType
    instagram?: InstagramSocialMediaType
    telegram?: TelegramSocialMediaType
    x?: XSocialMediaType
    discord?: DiscordSocialMedia
    custom_logs?: object
}

export interface SocialMediaCreateRequestType {
    user_id: number
    access_token: string
    type: string  // FIXME: enum
    social_media: SocialMediaCreateDetailType
}

export interface SocialMediaCreateResponseType {
    user_id: number
    social_media: SocialMediaBaseType
}

export interface SocialMediaDetailsType {
    social_media: SocialMediaBaseType
}

export interface SocialMediaRetrievalRequestType {
    id: number
    access_token: string
    user_id?: number
}

export interface SocialMediaRetrievalResponseType {
    user_id: number
    social_media: SocialMediaBaseType
}

export interface SocialMediaUpdateRequestType {
    id: number
    access_token: string
    user_id?: number
    type: string  //FIXME: enum
    social_media: SocialMediaCreateDetailType
}

export interface SocialMediaUpdateResponseType {
    user_id: number
    social_media: SocialMediaCategrizedBaseType
}

// TikTokSocialMediaSchema,
// PinterestSocialMediaSchema,
// RedditSocialMediaSchema,
// DiscordSocialMediaSchema,
// TwitchSocialMediaSchema,
// PatreonSocialMediaSchema,

// FRIEND
enum FriendStatusType {
    pending = "pending",
    active = "active",
    rejected = "rejected"
}

export interface FriendIds {
    sender_id: number
    id: number
    receiver_id: number
}

export interface FriendBaseType {
    sender_id: number
    status: FriendStatusType
    id: number
    updated_at: string
    receiver_id: number
    created_at: string
    custom_logs?: object

}

export interface FriendUpdateDetailsType {
    status: FriendStatusType
    custom_logs?: object
}

export interface FriendType {
    id: number
    status: FriendStatusType
    created_at: string
    updated_at: string
    custom_logs?: object
}

export interface FriendDetailsType {
    friend_base: FriendType
    sender_id: number
    receiver_id: number
    // # sender: UserType
    // # receiver: UserType
}

export interface FriendCreateRequestType {
    access_token: string
    sender_id: number
    receiver_id: number
    status: FriendStatusType
}

export interface FriendCreateResponseType {
    friend_details: FriendDetailsType
}

export interface FriendRetrievalRequestType {
    access_token: string
    id: number
}

export interface FriendWithIdsRetrievalResponseType {
    sender?: FriendBaseType[]
    receiver?: FriendBaseType[]
}

export interface FriendRetrievalResponseType {
    friend_details: FriendDetailsType
}

export interface FriendUpdateByIdRequestType {
    id?: number
    access_token: string
    friend_payload: FriendUpdateDetailsType
}

export interface FriendUpdateBySenderIdRequestType {
    sender_id?: number
    access_token: string
    friend_payload: FriendUpdateDetailsType
}

export interface FriendUpdateByReceiverIdRequestType {
    receiver_id?: number
    access_token: string
    friend_payload: FriendUpdateDetailsType
}

export interface FriendDetailsResponseType {
    friend_details: FriendDetailsType
}