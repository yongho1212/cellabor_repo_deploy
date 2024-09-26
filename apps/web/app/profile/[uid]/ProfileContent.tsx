// 'use client'
//
// import {useEffect, useState} from 'react'
// import {useAuth} from '../../providers/AuthProvider'
// import {useRouter} from 'next/navigation'
// import {profileApi} from '../../apis/profile'
//
// export default function ProfileContent({uid, searchParams}: {
//     uid: string, searchParams: { [key: string]: string | string[] | undefined }
// }) {
//     const [profile, setProfile] = useState(null)
//     const [isEditing, setIsEditing] = useState(false)
//     const {user, loading} = useAuth()
//     const router = useRouter()
//
//     console.log(uid)
//     console.log(searchParams)
//
//     useEffect(() => {
//         if (loading) return
//
//         const fetchProfile = async () => {
//             try {
//                 const profileUid = uid === 'my' ? user?.uid : uid
//                 if (!profileUid) {
//                     if (uid === 'my') {
//                         router.push('/login')
//                         return
//                     }
//                     throw new Error('Invalid UID')
//                 }
//                 const profileData = await profileApi.fetchProfileData(profileUid)
//                 setProfile(profileData)
//             } catch (error) {
//                 console.error('Error fetching profile:', error)
//             }
//         }
//
//         fetchProfile()
//     }, [uid, user, loading, router])
//
//     if (loading || !profile) return <div>Loading...</div>
//
//     const isOwnProfile = user?.uid === (uid === 'my' ? user?.uid : uid)
//
//     const handleEdit = () => {
//         setIsEditing(true)
//     }
//
//     const handleSave = async () => {
//         try {
//             // 여기에 프로필 업데이트 로직 추가
//             // await updateProfile(uid, profile)
//             setIsEditing(false)
//         } catch (error) {
//             console.error('Error updating profile:', error)
//         }
//     }
//
//     return (
//         <div>
//             <h1>{profile?.name}의 프로필</h1>
//             {isOwnProfile && <p>내 프로필입니다.</p>}
//             {isEditing ? (
//                 <>
//                     <input
//                         value={profile.name}
//                         onChange={(e) => setProfile({...profile, name: e.target.value})}
//                     />
//                     <textarea
//                         value={profile.bio}
//                         onChange={(e) => setProfile({...profile, bio: e.target.value})}
//                     />
//                     <button onClick={handleSave}>저장</button>
//                 </>
//             ) : (
//                 <>
//                     <p>{profile.bio}</p>
//                     {isOwnProfile && <button onClick={handleEdit}>편집</button>}
//                 </>
//             )}
//         </div>
//     )
// }
