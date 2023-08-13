export interface Post {
  id: number;
  title: string;
  post_type: string;
  pre_post: string;
  small_image: string;
  created_at: string;
}

export interface PostForMobile {
  id: number;
  title: string;
  post_type: string;
  created_at: string;
}

export interface PostDetail {
  id: number;
  title: string;
  post: string;
  image: string;
}

export interface PostMobileDetail {
  id: number;
  title: string;
  post_for_mobile: string;
}

export interface IdPosts {
  id: number;
}

export interface ITypePost {
  id: string
  value: string
}
