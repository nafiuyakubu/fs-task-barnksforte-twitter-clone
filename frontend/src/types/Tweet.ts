export interface SharedUser {
  name: string;
  UserTweetShare: {
    tweetId: number;
    sharedWithUserId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Tweet {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  source: "own" | "shared";
  sharedWith?: SharedUser[];
}
