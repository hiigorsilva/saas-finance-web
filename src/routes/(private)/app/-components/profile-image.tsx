import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function ProfileImage() {
  return (
    <Avatar>
      <AvatarImage src="https://yt3.ggpht.com/yti/ANjgQV8yabAzznv4heHdClJICJ4Qlxb_R9a0-cOh9dJ2dh8agVM=s88-c-k-c0x00ffffff-no-rj" />
      <AvatarFallback>HS</AvatarFallback>
    </Avatar>
  )
}
