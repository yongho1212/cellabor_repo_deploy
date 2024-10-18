'use client'
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { PostInterface } from '../../../../types/src/index';
import { timeAgo } from '@repo/utils';
import Typography from '../Typography/Typography';

interface CardProps {
    post: PostInterface;
    environment: 'desktop' | 'mobile' | 'react-native';
    backgroundColor?: string;
    onPress?: (postId: string) => void;
    isList?: boolean
}

const PostCard: React.FC<CardProps> = ({ post, environment, backgroundColor = '#F3F4F6', isList }) => {
    const isMobile = environment === 'mobile' || environment === 'react-native';

    const styles = StyleSheet.create({
        container: {
            backgroundColor,
            borderRadius: 8,
            padding: 16,
            width: '100%',
            overflow: 'hidden',

        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            flexShrink: 1,
        },
        contentContainer: {
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        content: {
            fontSize: 14,
            color: '#4B5563',
            flexShrink: 1,
            marginRight: isMobile ? 0 : 16,
            marginBottom: isMobile ? 8 : 0,
        },
        image: {
            width: isMobile ? '100%' : 96,
            height: 96,
            borderRadius: 4,
        },
        tagsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 4,
            paddingBottom: 4,
            borderBottomWidth: !isList ? 1 : 0,
            borderBottomColor: '#D1D5DB',
        },
        tag: {
            backgroundColor: '#FEE2E2',
            color: '#B91C1C',
            borderRadius: 9999,
            paddingHorizontal: 8,
            paddingVertical: 4,
            fontSize: 12,
            marginRight: 4,
            marginBottom: 4,
        },
        footerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        authorContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        authorAvatar: {
            width: 20,
            height: 20,
            borderRadius: 10,
            marginRight: 4,
        },
        authorName: {
            fontSize: 12,
            color: '#6B7280',
        },
        statsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        statsText: {
            fontSize: 12,
            color: '#6B7280',
        },
    });

    const CardContent = () => (
        <>
            <View style={styles.contentContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title} numberOfLines={isMobile ? 1 : 2} ellipsizeMode='tail'>{post.title}</Text>
                    <Text style={styles.content} numberOfLines={isMobile ? 2 : 3} ellipsizeMode='tail'>{post.content}</Text>
                </View>
                <Image source={{ uri: post.thumbnail }} style={styles.image} />
            </View>
            <View style={styles.tagsContainer}>
                {post.hashTags.slice(0, 3).map((tag) => (
                    <Text key={tag} style={styles.tag}>{tag}</Text>
                ))}
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.authorContainer}>
                    <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
                    <Text style={styles.authorName}>{post.author.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>{timeAgo(post.createdAt)}</Text>
                    <Text style={[styles.statsText, { marginHorizontal: 4 }]}>|</Text>
                    <Text style={styles.statsText}>조회수 {post.viewCount}</Text>
                </View>
            </View>
        </>
    );

    // if (environment === 'react-native') {
    //     return (
    //         <TouchableOpacity
    //             // onPress={() => onPress(post.id)}
    //         >
    //             <View style={styles.container}>
    //                 <CardContent />
    //             </View>
    //         </TouchableOpacity>
    //     );
    // }

    return (
        <div
            // onClick={() => onPress(post.id)}
            style={{
                ...styles.container,
                cursor: 'pointer',
            }}
        >
            <CardContent />
        </div>
    );
};

export default PostCard;
