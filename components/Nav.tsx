import Link from "next/link";
import { auth } from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Nav() {
	const [user, loading] = useAuthState(auth);
	return (
		<nav className="flex justify-between items-center py-10">
			<Link href="/">
				<button className="text-lg font-semibold">Creative Minds</button>
			</Link>
			<ul className="flex items-center gap-10">
				{!user && (
					<Link href={'/auth/login'}>
						<span className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-semibold ml-8">
							Join Now
						</span>
					</Link>
				)}
				{user && (
					<div className="flex items-center gap-6">
						<Link href="/post">
							<button className="font-semibold bg-cyan-500 text-white py-2 px-4 rounded-md text-xs">Post</button>
						</Link>
						<Link href="/dashboard">
							<img className="w-12 rounded-full cursor-pointer" src={user.photoURL || ''} />
						</Link>
					</div>
				)}
			</ul>
		</nav>
	)
} 