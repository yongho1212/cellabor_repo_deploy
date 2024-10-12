import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@repo/apis';
import { UserInfoInterface } from '@repo/types';

export const useProfileData = (uid: string | undefined) => {
    const queryClient = useQueryClient();

    const { data: profileData, isLoading, error } = useQuery({
        queryKey: ['profileData', uid],
        queryFn: () => userApi.fetchProfileData(uid!),
        enabled: !!uid,
        select: (data) => data.user,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const updateProfileMutation = useMutation({
        mutationFn: (newData: Partial<UserInfoInterface>) =>
            userApi.updateUserProfile(uid!, newData),
        onSuccess: (data) => {
            queryClient.setQueryData(['profileData', uid], (oldData: any) => ({
                ...oldData,
                user: data
            }));
        },
    });

    const updateProfileData = (newData: Partial<UserInfoInterface>) => {
        updateProfileMutation.mutate(newData);
    };

    return {
        profileData,
        isLoading,
        error,
        updateProfileData,
        isUpdating: updateProfileMutation.isPending
    };
};
