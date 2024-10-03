import { Utils } from "@telegram-apps/sdk"
import { CSSProperties, Dispatch, SetStateAction } from "react"
// COMPONENTS
export interface TitleComponentProps {
    titlename: string
    style?: CSSProperties
}


export interface CountdownProps {
    targetDate: string
}

export interface DemoTitleProps {
    titlename: string,
    style?: string
}
/* export interface AccountType {
    id: number
    app_info?: UserAppInfoType
    personal_info?: UserPersonalInfoType
    telegram_info?: UserTelegramInfoType
    created_at?: string
    updated_at?: string
    custom_logs?: object
}
 */


// PAGE
export interface DemoEarnComponentProp {
    timeLeft: string,
    totalPointAmount: number,
    sgTime: string,
    isClicked: boolean,
    setIsClicked: Dispatch<SetStateAction<boolean>>,
    appLink: string,
    /*     dailyReward: boolean,
        setDailyReward: Dispatch<SetStateAction<boolean>>, */
}

export interface DemoDailyRewardComponentProp {
    timeLeft: string
    sgTime: string
    isClicked: boolean,
    setIsClicked: Dispatch<SetStateAction<boolean>>,
    /*   dailyReward: boolean,
      setDailyReward: Dispatch<SetStateAction<boolean>>, */
}

export interface DemoBonusComponentProp {
    weeklyCount?: number,
    referralCount?: number,
}

export interface DemoFriendReferralComponentProp {
    referralCount?: number
}

export interface DemoLinkSocialMediaLink {
    label: string
    url: string
    icon: React.ReactNode
    cto: string
}

export interface DemoLinkProp {
    utils: Utils
    appLink: string
    socialMediaLinks?: DemoLinkSocialMediaLink[]
}

export interface ReferralRankingItemType {
    rank: number,
    name: string;
    referral: number;
}

export interface PointRankingItemType {
    rank: number,
    name: string;
    point: number;
}

// CONTEXT 
export interface UserContextType {
    account: undefined | UserType
    setAccount: Dispatch<SetStateAction<undefined | UserType>>
    isWaitingUser: boolean
    setIsWaitingUser: Dispatch<SetStateAction<boolean>>
}

export interface PointContextType {
    point: undefined | PointType
    setPoint: Dispatch<SetStateAction<undefined | PointType>>
    isWaitingPoint: boolean
    setIsWaitingPoint: Dispatch<SetStateAction<boolean>>
}

export interface ActivityContextType {
    activity: undefined | ActivityBaseType
    setActivity: Dispatch<SetStateAction<undefined | ActivityBaseType>>
    isWaitingActivity: boolean
    setIsWaitingActivity: Dispatch<SetStateAction<boolean>>
    // isTodayCheckedIn: boolean,
    // setIsTodayCheckedIn: Dispatch<SetStateAction<boolean>>
}

export interface FriendContextType {
    friend: undefined | FriendWithIdsRetrievalResponseType
    setFriend: Dispatch<SetStateAction<undefined | FriendWithIdsRetrievalResponseType>>
    isWaitingFriend: boolean
    setIsWaitingFriend: Dispatch<SetStateAction<boolean>>
    friendNumber: number,
    setFriendNumber: Dispatch<SetStateAction<number>>
    friendTrigger: number,
    setFriendTrigger: Dispatch<SetStateAction<number>>
    // notYetClaimRewardReferral: number
    // setNotYetClaimRewardReferral: Dispatch<SetStateAction<number>>
    // isTodayCheckedIn: boolean,
    // setIsTodayCheckedIn: Dispatch<SetStateAction<boolean>>
}

export interface RecordContextType {
    record: undefined | RecordType
    setRecord: Dispatch<SetStateAction<undefined | RecordType>>
    isWaitingRecord: boolean
    setIsWaitingRecord: Dispatch<SetStateAction<boolean>>
}

// USER
export interface UserBaseType {
    username: string
    telegram_id: string
    token_balance: string
    active: boolean
    premium: boolean

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
    premium: boolean
    wallet_address?: string
    chat_id: string,
    start_param?: string

}

export interface UserAppInfoType {
    active: boolean
    in_game_items?: object
    admin?: boolean
    skin: string[]
    custom_logs?: object
}


export interface UserUpdateDetailsType {
    token_balance?: number
    active?: boolean
    premium?: boolean
    in_game_items?: object
    skin?: string[]
    location?: string
    age?: number
    username?: string
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

export interface UserFriendRankingType {
    rank: number
    sender_count: number
    user_id: number
    telegram_id: string
    username: string
}

export interface UserFriendRankingListType {
    top_10: UserFriendRankingType[]
    sender_info: UserFriendRankingType
    sender_in_top_10: boolean
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
    login_amount: number
    referral_amount: number
    extra_profit_per_hour: number
    // referral_action: string
    created_at: string
    updated_at: string
    custom_logs?: {
        action: string,
        date: string
    }
}


export interface PointDetailsType {
    point: PointType
    user_id?: number
}


export interface PointCreateDetailsType {
    login_amount?: number
    referral_amount?: number
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
    id?: number
    access_token: string
    user_id?: number
}



export interface PointRetrievalResponseType {
    point_base: PointDetailsType
}

export interface PointUpdateByIdRequestType {
    id: number
    type: string // REVIEW: add / drop point
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

export interface PointRankingItemServerType {
    rank: number
    total_points: number
    user_id: number
    id: number | undefined
    username: string
    telegram_id: string
}

export interface PointRankingListType {
    top_10: PointRankingItemServerType[]
    user_info: PointRankingItemServerType
    point_in_top_10: boolean
}

// ACTIVITY

export interface ActivityBaseType {
    id: number
    logged_in: boolean
    login_streak: number
    total_logins: number
    last_action_time?: string
    last_login_time?: string
    created_at: string
    updated_at: string
    custom_logs?: object
}

export interface ActivityType {
    logged_in: boolean
    login_streak: number
    total_logins: number
    last_action_time?: string
    last_login_time?: string
    created_at: string
    updated_at: string
    custom_logs?: object
}

export interface ActivityCreateDetailType {
    custom_logs?: object
}


export interface ActivityUpdateDetailType extends ActivityCreateDetailType {
    logged_in?: boolean
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
    id?: number
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
    youtube_following?: boolean
    youtube_viewed?: boolean
    youtube_view_date?: string
}

export interface FacebookSocialMediaType {

    facebook_id?: string
    facebook_following?: boolean
    facebook_followed_date?: string
}

export interface InstagramSocialMediaType {
    instagram_id?: string
    instagram_following?: boolean
    instagram_follow_trigger_verify_date?: string
    instagram_followed_date?: string
    instagram_tagged?: boolean
    instagram_tagged_date?: string
    instagram_reposted?: boolean
    instagram_reposted_date?: string
}

export interface TelegramSocialMediaType {
    telegram_id?: string
    telegram_following?: boolean
    telegram_followed_date?: string
}

export interface XSocialMediaType {
    x_id?: string
    x_following?: boolean
    x_followed_date?: string
}

export interface DiscordSocialMedia {
    discord_id?: string
    discord_following?: boolean
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
    youtube_following?: boolean
    youtube_viewed?: boolean
    youtube_view_date?: string

    facebook_id?: string
    facebook_following?: boolean
    facebook_followed_date?: string

    instagram_id?: string
    instagram_following?: boolean
    instagram_follow_trigger_verify_date?: string
    instagram_followed_date?: string
    instagram_tagged?: boolean
    instagram_tagged_date?: string
    instagram_reposted?: boolean
    instagram_reposted_date?: string

    telegram_id?: string
    telegram_following?: boolean
    telegram_followed_date?: string

    x_id?: string
    x_following?: boolean
    x_followed_date?: string

    discord_id?: string
    discord_following?: boolean
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
export enum FriendStatusType {
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
    status: FriendStatusType,
    has_claimed: boolean
    id: number
    updated_at: string
    receiver_id: number
    created_at: string
    custom_logs?: {
        action: string,
        date: string
    }

}

export interface FriendUpdateDetailsType {
    status?: FriendStatusType
    has_claimed?: boolean
    custom_logs?: {
        action: string,
        date: string
    }
}

export interface FriendType {
    id: number
    status: FriendStatusType
    has_claimed: boolean
    created_at: string
    updated_at: string
    custom_logs?: {
        action: string,
        date: string
    }
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
    has_claimed: boolean
}

export interface FriendCreateResponseType {
    friend_details: FriendDetailsType
}

export interface FriendRetrievalRequestType {
    id?: number
    access_token: string
    user_id?: number
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

export interface getFriendRequestType {
    access_token: string
    id?: number
    user_id?: number
}


// RECORD
export enum RecordActionType {
    create = "CREATE",
    get = "GET",
    list = "LIST",
    update = 'UPDATE'
}

export enum RecordTableType {
    user = "USER",
    point = "POINT",
    friend = "FRIEND",
    gammeCharacter = 'GAME_CHARACTER',
    social_media = 'SOCIAL_MEDIA',
    activity = 'ACTIVITY',
    record = 'RECORD'
}

export interface RecordType {
    id: number
    action: RecordActionType
    table: RecordTableType
    table_id: number
    // referral_action: string
    created_at: string
    updated_at: string
    custom_logs?: object
}


export interface RecordDetailsType {
    record: RecordType
    user_id?: number
}


export interface RecordCreateDetailsType {
    login_amount?: number
    referral_amount?: number
    extra_profit_per_hour?: number
    custom_logs?: object
}


export interface RecordCreateRequestType {
    user_id: number
    access_token: string
    record_details: RecordCreateDetailsType
}


export interface RecordCreateResponseType {
    record_base: RecordDetailsType
}


export interface RecordRetrievalRequestType {
    id?: number
    access_token: string
    user_id?: number
}



export interface RecordRetrievalResponseType {
    record_base: RecordDetailsType
}
