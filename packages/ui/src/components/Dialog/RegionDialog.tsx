'use client'

import React from 'react';
import { Modal, Text, TouchableOpacity, View, Button, StyleSheet, FlatList } from 'react-native';

interface Props {
    open: boolean;
    onConfrim: () => void;
    onClose: () => void;
}

interface SelectedRegion {
  city: string;
  child?: string;
}

interface RegionData {
  city: string;
  children: string[];
}

const RegionDialog = (props: Props) => {
    const { open, onConfrim, onClose } = props;
    const data = [
        {
          "city": "서울특별시",
          "children": [
            "종로구",
            "중구",
            "용산구",
            "성동구",
            "광진구",
            "동대문구",
            "중랑구",
            "성북구",
            "강북구",
            "도봉구",
            "노원구",
            "은평구",
            "서대문구",
            "마포구",
            "양천구",
            "강서구",
            "구로구",
            "금천구",
            "영등포구",
            "동작구",
            "관악구",
            "서초구",
            "강남구",
            "송파구",
            "강동구"
          ]
        },
        {
          "city": "부산광역시",
          "children": [
            "중구",
            "서구",
            "동구",
            "영도구",
            "부산진구",
            "동래구",
            "남구",
            "북구",
            "해운대구",
            "사하구",
            "금정구",
            "강서구",
            "연제구",
            "수영구",
            "사상구",
            "기장군"
          ]
        },
        {
          "city": "대구광역시",
          "children": [
            "중구",
            "동구",
            "서구",
            "남구",
            "북구",
            "수성구",
            "달서구",
            "달성군",
            "군위군"
          ]
        },
        {
          "city": "인천광역시",
          "children": [
            "중구",
            "동구",
            "미추홀구",
            "연수구",
            "남동구",
            "부평구",
            "계양구",
            "서구",
            "강화군",
            "옹진군"
          ]
        },
        {
          "city": "광주광역시",
          "children": ["동구", "서구", "남구", "북구", "광산구"]
        },
        {
          "city": "대전광역시",
          "children": ["동구", "중구", "서구", "유성구", "대덕구"]
        },
        {
          "city": "울산광역시",
          "children": ["중구", "남구", "동구", "북구", "울주군"]
        },
        {
          "city": "세종특별자치시",
          "children": []
        },
        {
          "city": "경기도",
          "children": [
            "수원시 장안구",
            "수원시 권선구",
            "수원시 팔달구",
            "수원시 영통구",
            "성남시 수정구",
            "성남시 중원구",
            "성남시 분당구",
            "의정부시",
            "안양시 만안구",
            "안양시 동안구",
            "부천시",
            "광명시",
            "평택시",
            "동두천시",
            "안산시 상록구",
            "안산시 단원구",
            "고양시 덕양구",
            "고양시 일산동구",
            "고양시 일산서구",
            "과천시",
            "구리시",
            "남양주시",
            "오산시",
            "시흥시",
            "군포시",
            "의왕시",
            "하남시",
            "용인시 처인구",
            "용인시 기흥구",
            "용인시 수지구",
            "파주시",
            "이천시",
            "안성시",
            "김포시",
            "화성시",
            "광주시",
            "양주시",
            "포천시",
            "여주시",
            "연천군",
            "가평군",
            "양평군"
          ]
        },
        {
          "city": "충청북도",
          "children": [
            "청주시 상당구",
            "청주시 서원구",
            "청주시 흥덕구",
            "청주시 청원구",
            "충주시",
            "제천시",
            "보은군",
            "옥천군",
            "영동군",
            "증평군",
            "진천군",
            "괴산군",
            "음성군",
            "단양군"
          ]
        },
        {
          "city": "충청남도",
          "children": [
            "천안시 동남구",
            "천안시 서북구",
            "공주시",
            "보령시",
            "아산시",
            "서산시",
            "논산시",
            "계룡시",
            "당진시",
            "금산군",
            "부여군",
            "서천군",
            "청양군",
            "홍성군",
            "예산군",
            "태안군"
          ]
        },
        {
          "city": "전라북도",
          "children": [
            "전주시 완산구",
            "전주시 덕진구",
            "군산시",
            "익산시",
            "정읍시",
            "남원시",
            "김제시",
            "완주군",
            "진안군",
            "무주군",
            "장수군",
            "임실군",
            "순창군",
            "고창군",
            "부안군"
          ]
        },
        {
          "city": "전라남도",
          "children": [
            "목포시",
            "여수시",
            "순천시",
            "나주시",
            "광양시",
            "담양군",
            "곡성군",
            "구례군",
            "고흥군",
            "보성군",
            "화순군",
            "장흥군",
            "강진군",
            "해남군",
            "영암군",
            "무안군",
            "함평군",
            "영광군",
            "장성군",
            "완도군",
            "진도군",
            "신안군"
          ]
        },
        {
          "city": "경상북도",
          "children": [
            "포항시 남구",
            "포항시 북구",
            "경주시",
            "김천시",
            "안동시",
            "구미시",
            "영주시",
            "영천시",
            "상주시",
            "문경시",
            "경산시",
            "의성군",
            "청송군",
            "영양군",
            "영덕군",
            "청도군",
            "고령군",
            "성주군",
            "칠곡군",
            "예천군",
            "봉화군",
            "울진군",
            "울릉군"
          ]
        },
        {
          "city": "경상남도",
          "children": [
            "창원시 의창구",
            "창원시 성산구",
            "창원시 마산합포구",
            "창원시 마산회원구",
            "창원시 진해구",
            "진주시",
            "통영시",
            "사천시",
            "김해시",
            "밀양시",
            "거제시",
            "양산시",
            "의령군",
            "함안군",
            "창녕군",
            "고성군",
            "남해군",
            "하동군",
            "산청군",
            "함양군",
            "거창군",
            "합천군"
          ]
        },
        {
          "city": "제주특별자치도",
          "children": ["제주시", "서귀포시"]
        },
        {
          "city": "강원특별자치도",
          "children": [
            "춘천시",
            "원주시",
            "강릉시",
            "동해시",
            "태백시",
            "속초시",
            "삼척시",
            "홍천군",
            "횡성군",
            "영월군",
            "평창군",
            "정선군",
            "철원군",
            "화천군",
            "양구군",
            "인제군",
            "고성군",
            "양양군"
          ]
        }
      ];

      
      
    const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
      },
      modalOverlay: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
          width: '100%',
          height: '80%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          flexDirection: 'column',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
      },
      modalText: {
          marginBottom: 15,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
      },
      regionContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          height: '70%',
      },
      cityList: {
          width: '40%',
          backgroundColor: '#f1f1f1',
          padding: 10,
          borderRadius: 5,
      },
      childrenList: {
          width: '50%',
          backgroundColor: '#f9f9f9',
          padding: 10,
          borderRadius: 5,
      },
      cityItem: {
          padding: 10,
          marginBottom: 5,
          backgroundColor: '#fff',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#ccc',
      },
      selected: {
          backgroundColor: '#cceeff',
      },
      childItem: {
          padding: 10,
          marginBottom: 5,
          backgroundColor: '#fff',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#ccc',
      },
      button: {
          borderRadius: 5,
          padding: 10,
          elevation: 2,
          marginTop: 20,
      },
      buttonClose: {
          backgroundColor: '#2196F3',
      },
      textStyle: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
      },
      selectedContainer: {
          width: '100%',
          marginBottom: 20,
      },
      selectedTitle: {
          fontSize: 16,
          fontWeight: 'bold',
      },
      selectedItem: {
          fontSize: 14,
          marginVertical: 2,
      },
      selectedItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 10,
    },
  });
      
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);
  const [selectedRegions, setSelectedRegions] = React.useState<SelectedRegion[]>([]);

  // 선택된 리스트 변경 시 콘솔 출력
  React.useEffect(() => {
      console.log('selectedRegions', selectedRegions);
  }, [selectedRegions]);

  const onCitySelect = (city: string) => {
      setSelectedCity(city);
  };

  const onChildSelect = (child: string) => {
      if (selectedCity && !selectedRegions.some(region => region.city === selectedCity && region.child === child)) {
          setSelectedRegions((prev) => [...prev, { city: selectedCity, child }]);
      }
  };

  const addCityWithoutChildren = (city: string) => {
      if (!selectedRegions.some(region => region.city === city && !region.child)) {
          setSelectedRegions((prev) => [...prev, { city }]);
      }
  };

  const removeSelectedRegion = (city: string, child?: string) => {
      setSelectedRegions((prev) => prev.filter(region => !(region.city === city && region.child === child)));
  };

  const selectedCityData = data.find((item) => item.city === selectedCity);

  const renderSelectedRegions = () => (
      <View style={styles.selectedContainer}>
          <Text style={styles.selectedTitle}>Selected Regions:</Text>
          {selectedRegions.map((region, index) => (
              <View key={index} style={styles.selectedItemContainer}>
                  <Text style={styles.selectedItem}>
                      {region.city} {region.child ? `- ${region.child}` : ''}
                  </Text>
                  <TouchableOpacity onPress={() => removeSelectedRegion(region.city, region.child)}>
                      <Text style={styles.removeButton}>X</Text>
                  </TouchableOpacity>
              </View>
          ))}
      </View>
  );

  return (
      <View style={styles.container}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={open}
              onRequestClose={onClose}
          >
              <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Select a Region</Text>

                      {/* 선택된 리스트를 최상단에 표시 */}
                      {selectedRegions.length > 0 && renderSelectedRegions()}

                      <View style={styles.regionContainer}>
                          <View style={styles.cityList}>
                              <FlatList
                                  data={data}
                                  keyExtractor={(item) => item.city}
                                  renderItem={({ item }) => (
                                      <TouchableOpacity
                                          style={[
                                              styles.cityItem,
                                              selectedCity === item.city ? styles.selected : null
                                          ]}
                                          onPress={() => {
                                              onCitySelect(item.city);
                                              if (item.children.length === 0) {
                                                  addCityWithoutChildren(item.city);
                                              }
                                          }}
                                      >
                                          <Text>{item.city}</Text>
                                      </TouchableOpacity>
                                  )}
                              />
                          </View>

                          <View style={styles.childrenList}>
                              {selectedCityData && selectedCityData.children.length > 0 ? (
                                  <FlatList
                                      data={selectedCityData.children}
                                      keyExtractor={(child) => child}
                                      renderItem={({ item }) => (
                                          <TouchableOpacity
                                              style={styles.childItem}
                                              onPress={() => onChildSelect(item)}
                                          >
                                              <Text>{item}</Text>
                                          </TouchableOpacity>
                                      )}
                                  />
                              ) : (
                                  <Text>Select a city to see regions</Text>
                              )}
                          </View>
                      </View>

                      <TouchableOpacity
                          style={[styles.button, styles.buttonClose]}
                          onPress={onConfrim}
                      >
                          <Text style={styles.textStyle}>Confirm</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                          style={[styles.button, styles.buttonClose]}
                          onPress={onClose}
                      >
                          <Text style={styles.textStyle}>Close</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Modal>
      </View>
  );
};

export default RegionDialog;