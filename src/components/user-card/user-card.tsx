import { User } from '../../models/user-models';
import './style.css';

type UserCardProps = Pick<User, 'image' | 'lastName' | 'address' | 'firstName'>;

export function UserCard({
	image,
	lastName,
	firstName,
	address: { city },
}: UserCardProps) {
	return (
		<div className='userCard'>
			<img className='userPic' src={image} />
			<div className='userInfo'>
				<div>{`${firstName} ${lastName}`}</div>
				<div>{city}</div>
			</div>
		</div>
	);
}
