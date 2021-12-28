import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { supabase } from '../utils/supabaseClient'

const Home: NextPage = () => {
	const [session, setSession] = useState(null)

	useEffect(() => {
		setSession(supabase.auth.session())

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	console.log({session})

	async function signInWithTwitter() {
		await supabase.auth.signIn({
			provider: 'twitter',
		})
	}

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen bg-[#D33943]">
			{session ? (
				<>
				<h3 className="mt-3 text-lg text-white">
					Welcome {session?.user.user_metadata.full_name}
				</h3>
				<h3 className="mt-3 text-lg text-white">
					You are signed in as {session?.user.email}
				</h3>
				<button
					className="px-4 py-2 mt-3 text-black bg-white rounded-lg"
					onClick={() => supabase.auth.signOut()}
				>
					Sign out
				</button>
				</>
			) : (
				<>
				<h1 className="text-3xl font-semibold text-white">
					How to add Twitter auth quickly with Supabase to your Next.js site
					⚡
				</h1>

				<button
					onClick={signInWithTwitter}
					className="relative px-4 py-2 bg-[#1eb872] rounded-lg text-white mt-4"
				>
					Twitter sign in
				</button>
				</>
			)}
			<br/>
			<p>

			<a href='http://twitter-likes.local:3000'>Home</a>
			</p>

		</div>
	)
}

export default Home
