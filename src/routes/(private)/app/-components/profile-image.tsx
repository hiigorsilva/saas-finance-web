import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ProfileImageProps = {
  userName: string | undefined
}

export function ProfileImage({ userName }: ProfileImageProps) {
  return (
    <Avatar>
      <AvatarImage src="" />
      <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}
