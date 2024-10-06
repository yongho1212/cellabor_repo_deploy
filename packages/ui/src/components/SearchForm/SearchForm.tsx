import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SearchFormProps {
    onSearch: (term: string, filters: string[], sortBy: string) => void;
    isMobile: boolean;
}

const SearchFormComponent: React.FC<SearchFormProps> = ({ onSearch, isMobile }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [sortBy, setSortBy] = useState('latest');

    const handleSearch = () => {
        onSearch(searchTerm, activeFilters, sortBy);
    };

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const filterOptions = ['지역', '요일', '시간대', '실내/실외', '장소'];

    const renderFilters = () => (
        <ScrollView style={styles.filterContainer}>
            {filterOptions.map((filter) => (
                <TouchableOpacity
                    key={filter}
                    style={[
                        styles.filterButton,
                        activeFilters.includes(filter) && styles.activeFilterButton
                    ]}
                    onPress={() => toggleFilter(filter)}
                >
                    <Text style={[
                        styles.filterButtonText,
                        activeFilters.includes(filter) && styles.activeFilterButtonText
                    ]}>
                        {filter}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const SortByPicker = Platform.select({
        web: () => (
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={styles.picker}
            >
                <option value="latest">최신순</option>
                <option value="popular">인기도순</option>
            </select>
        ),
        default: () => (
            <Picker
                selectedValue={sortBy}
                onValueChange={(itemValue) => setSortBy(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="최신순" value="latest" />
                <Picker.Item label="인기도순" value="popular" />
            </Picker>
        ),
    })();

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Text>🔍</Text>
                </TouchableOpacity>
            </View>
            {SortByPicker}
            {isMobile ? (
                <>
                    <TouchableOpacity onPress={toggleDrawer} style={styles.filterToggleButton}>
                        <Text>필터</Text>
                    </TouchableOpacity>
                    {isDrawerOpen && (
                        <View style={styles.drawer}>
                            {renderFilters()}
                        </View>
                    )}
                </>
            ) : (
                renderFilters()
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchButton: {
        padding: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    filterButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginRight: 10,
        marginBottom: 10,
    },
    activeFilterButton: {
        backgroundColor: '#007bff',
    },
    filterButtonText: {
        color: '#333',
    },
    activeFilterButtonText: {
        color: '#fff',
    },
    filterToggleButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    drawer: {
        position: 'absolute',
        right: 0,
        top: 80,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    picker: {
        height: 50,
        width: 150,
        marginBottom: 10,
    },
});

export default SearchFormComponent;
