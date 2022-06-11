import { theme } from '@app/theme';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Box } from '@shared/components/layout/Box';
import Spacer from '@shared/components/layout/Spacer';
import Text from '@shared/components/Text';
import { getRarityInfo, getRegionInfo, getTypeInfo } from '@shared/helpers/get-filter-info';
import { normalize } from '@shared/helpers/normalize-pixels';
import { IGetCardResponse } from '@shared/types/cards.types';
import { CardType, RarityType, RegionType } from '@shared/types/filters.types';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import StarIcon from '@assets/icons/star.svg';
import Animated from 'react-native-reanimated';
import { Card, ModalWrapper } from './styles';
import Divider from '../layout/Divider';
import CloseIcon from '@assets/icons/close.svg';
import { getCardByCode } from '@app/api/services/cards/get-card-by-code.service';

export type BottomSheetModalHandler = BottomSheetModal;

type CardModalProps = {
  card?: IGetCardResponse;
};

const { width } = Dimensions.get('window');
const CARD_HEIGHT = normalize(325);
const CARD_WIDTH = normalize(CARD_HEIGHT / 1.3); // get width = 250
const CARD_SPACER_SIZE = (normalize(width + 15) - CARD_WIDTH) / 2;

const CardModal: ForwardRefRenderFunction<BottomSheetModal, CardModalProps> = ({ card }, ref) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  useImperativeHandle(ref, () => bottomSheetRef.current as BottomSheetModal, []);
  const { t } = useTranslation('shared');

  // const [isFavorite, setIsFavorite] = useState(card?.isFavorite);
  //TODO: implement favorite
  const [isFavorite, setIsFavorite] = useState(false);
  const snapPoints = useMemo(() => ['100%'], []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundComponent={() => <Box opacity={0} />}
      handleComponent={null}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      backdropComponent={props => {
        return (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.8} />
        );
      }}>
      <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.close()}>
        <View style={{ flex: 1 }}>
          <Box alignItems="flex-end" mt="md" mr="sm">
            <CloseIcon width={normalize(40)} height={normalize(40)} fill={theme.colors.white} />
          </Box>
        </View>
      </TouchableWithoutFeedback>

      <ModalWrapper>
        <Box
          alignItems="center"
          style={{
            position: 'absolute',
            top: normalize(-170),
          }}>
          <CardsSlider card={card} />
        </Box>
        <Spacer height={180} />
        <Box alignSelf="center">
          <TouchableOpacity
            onPress={() => {
              setIsFavorite(prev => !prev);
            }}>
            <StarIcon
              width={normalize(40)}
              height={normalize(40)}
              stroke={theme.colors.text_default}
              fill={isFavorite ? theme.colors.favorite : 'none'}
            />
          </TouchableOpacity>
        </Box>
        <ScrollView overScrollMode="never">
          <Box px="lg" pb="xlg" flex={1}>
            <Spacer height={20} />
            <Box flexDirection="row">
              {/* fazer funfar types e raridade */}
              <CardInfoItem type="region" regions={card?.regionRef} />
              {/* <Box mx="md"> */}
              <CardInfoItem type="type" cardType={card?.type} />
              {/* </Box> */}
              <CardInfoItem type="rarity" rarity={card?.rarityRef} />
            </Box>

            <Divider my="lg" />

            {card?.keywords && card?.keywords.length > 0 && (
              <Box>
                <Text variant="title">{t('card_info.keywords')}</Text>
                {card?.keywords.map(keyword => {
                  return (
                    <Text mt="md" mr="md">
                      - {keyword}
                    </Text>
                  );
                })}
              </Box>
            )}

            <Text variant="title" mt="lg">
              {t('card_info.description')}
            </Text>
            <Text mt="md">{card?.descriptionRaw}</Text>
          </Box>
        </ScrollView>
      </ModalWrapper>
    </BottomSheetModal>
  );
};

type CardsSliderProps = {
  card?: IGetCardResponse;
};

const CardsSlider = ({ card }: CardsSliderProps) => {
  const [associatedCards, setAssociatedCards] = useState<IGetCardResponse[]>([]);

  const images = useMemo(() => {
    if (!card) return [];

    const selected: IGetCardResponse = card;
    const spacer = selected;

    return [spacer, selected, ...associatedCards, spacer];
    // return [spacer, selected, spacer];
  }, [card, associatedCards]);

  const fetchAssociatedCards = async () => {
    const associated: IGetCardResponse[] = [];

    if (!card?.associatedCardsRefs) return [];

    for (let index: number = 0; index < card?.associatedCardsRefs.length; index++) {
      const ref = card?.associatedCardsRefs[index];
      const associatedCard = await getCardByCode(ref);
      if (!associatedCard) return;
      associated.push(associatedCard);
    }

    setAssociatedCards(associated);
  };

  useEffect(() => {
    fetchAssociatedCards();
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Box>
      <Animated.FlatList
        data={images}
        snapToStart
        snapToInterval={CARD_WIDTH}
        decelerationRate={0}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        renderItem={({ item, index }) => {
          if (index === 0 || index === images.length - 1) {
            return <View style={{ width: CARD_SPACER_SIZE }} />;
          }
          const inputRange = [
            (index - 2) * CARD_WIDTH,
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, normalize(-50), 0],
          });
          return (
            <Box>
              <Animated.View
                // @ts-ignore
                style={{
                  flex: 1,
                  transform: [{ translateY }],
                }}>
                <Box
                  flex={1}
                  style={{
                    paddingTop: normalize(50),
                  }}>
                  <RenderCard
                    key={`card-modal-item-${index}`}
                    uri={item.assets[0].gameAbsolutePath}
                  />
                </Box>
              </Animated.View>
            </Box>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};

type RenderCardProps = {
  uri: string;
};
const RenderCard = ({ uri }: RenderCardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card
      source={{ uri }}
      height={CARD_HEIGHT}
      width={CARD_WIDTH}
      onLoadEnd={() => setIsLoading(false)}>
      {isLoading && (
        <Box flex={1} justifyContent="center">
          <ActivityIndicator size="large" color="white" />
        </Box>
      )}
    </Card>
  );
};

type CardInfoItemProps = {
  type: 'region' | 'type' | 'rarity';
  regions?: RegionType[];
  cardType?: CardType;
  rarity?: RarityType;
};

const CardInfoItem = ({ type, regions, cardType, rarity }: CardInfoItemProps) => {
  const { t } = useTranslation('shared');

  const getItems = () => {
    switch (type) {
      case 'region':
        if (!regions) return [];
        return regions.map(key => {
          return getRegionInfo(key, t);
        });
      case 'type':
        if (!cardType) return [];
        return [getTypeInfo(cardType, t)];
      case 'rarity':
        if (!rarity) return [];
        return [getRarityInfo(rarity, t)];
    }
  };

  return (
    <Box flex={1} justifyContent="center">
      {getItems().map(item => {
        const Icon = item.icon;

        return (
          <Box key={item.toString()} flexDirection="row" alignItems="center" my="sm" flex={1}>
            <Icon width={normalize(30)} height={normalize(30)} fill={item.color ?? 'none'} />
            <Text
              mx="md"
              textAlign="center"
              flexShrink={1}
              numberOfLines={1}
              fontSize={type === 'region' ? normalize(20) : normalize(25)}>
              {item.label}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default forwardRef(CardModal);
