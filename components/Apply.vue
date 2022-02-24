<template>
  <b-container fluid style="margin-top: 15px; margin-bottom: 90px">
    <b-row>
      <b-col>
        <h3 class="mb-3">
          応募・アンケートフォーム
        </h3>
        <div class="d-flex align-items-end">
          <h6>現在のスタンプ所持数は，</h6>
          <h4>{{ userInfo.ownedStamps.length }}</h4>&nbsp;&nbsp;
          <h6>個です</h6>
        </div>
        <h6>獲得したスタンプの数に応じて，3つの賞に応募できます。</h6>
        <div v-if="!selected" style="margin-bottom: 80px; border-radius: 8px">
          <b-card
            v-if="userInfo.ownedStamps.length >= 30 && userInfo.applied === 0"
            class="shadow-sm my-3"
            style="border: none; background-color: #ff4c4c"
            text-variant="white"
          >
            <b-card-title @click="scrollTop(1)">
              まんなか佐賀さいこう賞
            </b-card-title>
            <div class="d-flex align-items-center">
              <h6>獲得スタンプ</h6>
              <h5>&nbsp;30&nbsp;</h5>
              <h6>個以上</h6>
              <fa :icon="faQuestionCircle" class="ml-auto mr-2" style="font-size: 22px" @click="openModal(1)" />
            </div>
            <!--            <div class="d-flex mt-3" style="font-size: 14px">-->
            <!--              <p>-->
            <!--                ・佐賀牛-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>5</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
          </b-card>
          <b-card
            v-else
            title="まんなか佐賀さいこう賞"
            class="shadow-sm my-3"
            style="border: none; background-color: #696969; border-radius: 8px"
            text-variant="white"
            button
            disabled
          >
            <div class="d-flex align-items-center">
              <h6>獲得スタンプ</h6>
              <h5>&nbsp;30&nbsp;</h5>
              <h6>個以上</h6>
              <fa :icon="faQuestionCircle" class="ml-auto mr-2" style="font-size: 22px" @click="openModal(1)" />
            </div>
            <h6 v-if="userInfo.applied === 1" class="mt-3" style="font-size: 14px">
              *応募済み*
            </h6>
            <!--            <div class="d-flex mt-3" style="font-size: 14px">-->
            <!--              <p>-->
            <!--                ・佐賀牛-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>5</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
          </b-card>
          <b-card
            v-if="userInfo.ownedStamps.length >= 20 && userInfo.applied === 0"
            class="shadow-sm my-3"
            style="border: none; background-color: #326cff; border-radius: 8px"
            text-variant="white"
          >
            <b-card-title @click="scrollTop(2)">
              佐賀まんなか賞
            </b-card-title>
            <div class="d-flex align-items-center">
              <h6>獲得スタンプ</h6>
              <h5>&nbsp;20&nbsp;</h5>
              <h6>個以上</h6>
              <fa :icon="faQuestionCircle" class="ml-auto mr-2" style="font-size: 22px" @click="openModal(2)" />
            </div>
            <!--            <div class="d-flex mt-3" style="font-size: 14px">-->
            <!--              <p>-->
            <!--                ・フォレストアドベンチャーペア招待券-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>5</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・ブラックモンブランファミリーパックセット-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>3</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・棚田米5㎏-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>3</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
          </b-card>
          <b-card
            v-else
            title="佐賀まんなか賞"
            class="shadow-sm my-3"
            style="border: none; background-color: #696969; border-radius: 8px"
            text-variant="white"
            button
            disabled
          >
            <div class="d-flex align-items-center">
              <h6>獲得スタンプ</h6>
              <h5>&nbsp;20&nbsp;</h5>
              <h6>個以上</h6>
              <fa :icon="faQuestionCircle" class="ml-auto mr-2" style="font-size: 22px" @click="openModal(2)" />
            </div>
            <h6 v-if="userInfo.applied === 2" class="mt-3" style="font-size: 14px">
              *応募済み*
            </h6>
            <!--            <div class="d-flex mt-3" style="font-size: 14px">-->
            <!--              <p>-->
            <!--                ・フォレストアドベンチャーペア招待券-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>5</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・ブラックモンブランファミリーパックセット-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>3</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・棚田米5㎏-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>3</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
          </b-card>
          <b-card
            v-if="userInfo.ownedStamps.length >= 10 && userInfo.applied === 0"
            class="shadow-sm my-3"
            style="border: none; background-color: #2bb673; border-radius: 8px"
            text-variant="white"
          >
            <b-card-title @click="scrollTop(3)">
              参加ありがとう賞
            </b-card-title>
            <div class="d-flex align-items-center">
              <h6>獲得スタンプ</h6>
              <h5>&nbsp;10&nbsp;</h5>
              <h6>個以上</h6>
              <fa :icon="faQuestionCircle" class="ml-auto mr-2" style="font-size: 22px" @click="openModal(3)" />
            </div>
            <!--            <div class="d-flex mt-3" style="font-size: 14px">-->
            <!--              <p>-->
            <!--                ・ひがしせふり温泉山茶花の湯ペア招待券-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>10</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・丸ぼうろ詰め合わせ-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>10</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・神埼の麺詰め合わせ-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>10</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・フルーラ3種×4本セット-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>10</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
          </b-card>
          <b-card
            v-else
            title="参加ありがとう賞"
            class="shadow-sm my-3"
            style="border: none; background-color: #696969; border-radius: 8px"
            text-variant="white"
            button
            disabled
          >
            <div class="d-flex align-items-center">
              <h6>獲得スタンプ</h6>
              <h5>&nbsp;10&nbsp;</h5>
              <h6>個以上</h6>
              <fa :icon="faQuestionCircle" class="ml-auto mr-2" style="font-size: 22px" @click="openModal(3)" />
            </div>
            <h6 v-if="userInfo.applied === 3" class="mt-3" style="font-size: 14px">
              *応募済み*
            </h6>
            <!--            <div class="d-flex mt-3" style="font-size: 14px">-->
            <!--              <p>-->
            <!--                ・ひがしせふり温泉山茶花の湯ペア招待券-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>10</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・丸ぼうろ詰め合わせ-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>10</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・神埼の麺詰め合わせ-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>10</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="d-flex">-->
            <!--              <p>-->
            <!--                ・フルーラ3種×4本セット-->
            <!--              </p>-->
            <!--              <div class="ml-auto d-flex">-->
            <!--                <h5>10</h5>-->
            <!--                <p>&nbsp;名</p>-->
            <!--              </div>-->
            <!--            </div>-->
          </b-card>
          <h6 class="text-center">
            *応募は一回限りとなります*<br>
            *各賞重複での応募はできません*
          </h6>
          <b-modal id="prizeModal" style="height: 500px; overflow: auto" centered hide-footer>
            <template #modal-title>
              景品
            </template>
            <div>
              <h5>{{ prizeTitle }}</h5>
              <div v-for="n in prizeName.length" :key="n.index" class="my-3">
                <h6>・{{ prizeName[n-1] }}</h6>
                <img :src="prizeImage[n-1]" als="image" style="width: 100%">
                <p style="font-size: 14px">
                  {{ prizeDesc[n-1] }}
                </p>
                <div class="d-flex align-items-baseline">
                  <p style="font-size: 14px">
                    抽選：
                  </p><h5>{{ prizeNum[n-1] }}</h5><p style="font-size: 14px">
                    名
                  </p>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
        <div v-if="selected">
          <b-row class="align-items-center mt-3">
            <b-col>
              <b-button variant="outline-primary" @click="selected = null">
                ＜戻る
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="d-flex mt-3">
              <p style="color: red">*</p><p>は必須項目です</p>
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-3">
            <b-col class="col-12">
              <div class="d-flex">
                <h5>氏名</h5>
                <p style="color: red">&nbsp;*</p>
              </div>
              <b-form-input v-model="formName" class="my-2 col-8" placeholder="例）山田 太郎" />
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-4">
            <b-col class="col-12">
              <div class="d-flex">
                <h5>性別</h5>
                <p style="color: red">&nbsp;*</p>
              </div>
              <b-form-radio-group
                v-model="formSex"
                :options="sexOption"
                class="my-2 col-12"
                value-field="item"
                text-field="name"
              />
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-4">
            <b-col class="col-12">
              <div class="d-flex">
                <h5>住所</h5>
                <p style="color: red">&nbsp;*</p>
              </div>
              <div>
                <h6 style="font-size: 14px">
                  （半角）
                </h6>
              </div>
              <div class="d-flex align-items-center">
                <h6 class="mx-2">
                  〒
                </h6>
                <b-form-input v-model="formZip1" class="col-2" />
                <h6 class="mx-1">
                  －
                </h6>
                <b-form-input v-model="formZip2" class="col-3" />
                <b-button variant="danger" class="float-right ml-auto" @click="searchAddress()">
                  住所検索
                </b-button>
              </div>
              <b-form-input v-model="formAddress1" class="my-2 col-12" placeholder="例）佐賀県佐賀市○○" />
              <b-form-input v-model="formAddress2" class="my-2 col-12" placeholder="例）○○マンション〇号室" />
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-4">
            <b-col class="col-12">
              <div class="d-flex">
                <h5>電話番号</h5>
                <p style="color: red">&nbsp;*</p>
              </div>
              <div>
                <h6 style="font-size: 14px">
                  （半角）
                </h6>
              </div>
              <div class="d-flex align-items-center">
                <b-form-input v-model="formPhone1" class="col-2" />
                <h5 class="mx-1">
                  －
                </h5>
                <b-form-input v-model="formPhone2" class="col-3" />
                <h5 class="mx-1">
                  －
                </h5>
                <b-form-input v-model="formPhone3" class="col-3" />
              </div>
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-4">
            <b-col class="col-12">
              <h5>メールアドレス</h5>
              <b-form-input v-model="formMail" class="my-2 col-12" />
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-4">
            <b-col class="col-12">
              <div class="d-flex">
                <h5>応募景品</h5>
                <p style="color: red">&nbsp;*</p>
              </div>
              <div v-if="selected === 1">
                <b-row class="d-flex">
                  <b-col class="col-6 mx-auto">
                    <b-card
                      id="1"
                      no-body
                      class="shadow-sm my-3"
                      style="border: solid #007bff; height: 90%"
                      @click="formPrize = '1'"
                    >
                      <b-card-img-lazy
                        :src="'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E4%BD%90%E8%B3%80%E7%89%9B%E3%83%AD%E3%83%BC%E3%82%B9.jpg?alt=media&token=eaf8cb5d-5989-4791-a801-13c2fd20a96b'"
                        alt="image"
                      />
                      <b-card-text class="m-2" style="font-size: 14px">
                        佐賀牛
                      </b-card-text>
                      <b-card-text class="m-2 mt-auto" style="font-size: 14px">
                        抽選 5名
                      </b-card-text>
                    </b-card>
                  </b-col>
                </b-row>
              </div>
              <div v-else-if="selected === 2">
                <b-row class="d-flex">
                  <b-col class="col-6">
                    <b-card
                      id="1"
                      no-body
                      class="shadow-sm my-3"
                      style="border: solid #007bff; height: 90%"
                      @click="formPrize = '1'"
                    >
                      <b-card-img-lazy
                        :src="'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E5%90%89%E9%87%8E%E3%83%B6%E9%87%8C1.jpg?alt=media&token=edc97239-4d15-4775-8d27-aaf57d970ffd'"
                        alt="image"
                      />
                      <b-card-text class="m-2" style="font-size: 14px">
                        フォレストアドベンチャー ペア招待券
                      </b-card-text>
                      <b-card-text class="m-2 mt-auto" style="font-size: 14px">
                        抽選 5名
                      </b-card-text>
                    </b-card>
                  </b-col>
                  <b-col class="col-6">
                    <b-card
                      id="2"
                      no-body
                      class="shadow-sm my-3"
                      style="border: solid transparent; height: 90%"
                      @click="formPrize = '2'"
                    >
                      <b-card-img-lazy
                        :src="'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E5%B0%8F%E5%9F%8E2.jpg?alt=media&token=08be4377-6a60-4ac2-9e35-6a2f49798ef4'"
                        alt="image"
                      />
                      <b-card-text class="m-2" style="font-size: 14px">
                        ブラックモンブラン ファミリーパックセット
                      </b-card-text>
                      <b-card-text class="m-2 mt-auto" style="font-size: 14px">
                        抽選 3名
                      </b-card-text>
                    </b-card>
                  </b-col>
                </b-row>
                <b-row class="d-flex">
                  <b-col class="col-6 mx-auto">
                    <b-card
                      id="3"
                      no-body
                      class="shadow-sm my-3"
                      style="border: solid transparent; height: 90%"
                      @click="formPrize = '3'"
                    >
                      <b-card-img-lazy
                        :src="'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E6%A3%9A%E7%94%B0%E7%B1%B3.jpg?alt=media&token=7311f528-a5cf-413d-a436-0814563b8828'"
                        alt="image"
                      />
                      <b-card-text class="m-2" style="font-size: 14px">
                        棚田米 5㎏
                      </b-card-text>
                      <b-card-text class="m-2 mt-auto" style="font-size: 14px">
                        抽選 3名
                      </b-card-text>
                    </b-card>
                  </b-col>
                </b-row>
              </div>
              <div v-else-if="selected === 3">
                <h6>一つ選択してください</h6>
                <b-row class="d-flex">
                  <b-col class="col-6">
                    <b-card
                      id="1"
                      no-body
                      class="shadow-sm my-3"
                      style="border: solid #007bff; height: 90%"
                      @click="formPrize = '1'"
                    >
                      <b-card-img-lazy
                        :src="'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E5%90%89%E9%87%8E%E3%83%B6%E9%87%8C2.jpg?alt=media&token=c3ddc558-955d-4118-b478-1f42f001f599'"
                        alt="image"
                      />
                      <b-card-text class="m-2" style="font-size: 14px">
                        ひがしせふり温泉山茶花の湯 ペア招待券
                      </b-card-text>
                      <b-card-text class="m-2 mt-auto" style="font-size: 14px">
                        抽選 10名
                      </b-card-text>
                    </b-card>
                  </b-col>
                  <b-col class="col-6">
                    <b-card id="2" no-body class="shadow-sm my-3" style="border: solid transparent; height: 90%" @click="formPrize = '2'">
                      <b-card-img-lazy
                        :src="'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E4%B8%B8%E3%81%BC%E3%81%86%E3%82%8D%E8%A9%B0%E3%82%81%E5%90%88%E3%82%8F%E3%81%9B.jpg?alt=media&token=9e85adfc-531e-40ca-9cf8-7c9fa9cb3846'"
                        alt="image"
                      />
                      <b-card-text class="m-2" style="font-size: 14px">
                        丸ぼうろ詰め合わせ
                      </b-card-text>
                      <b-card-text class="m-2 mt-auto" style="font-size: 14px">
                        抽選 10名
                      </b-card-text>
                    </b-card>
                  </b-col>
                </b-row>
                <b-row class="d-flex">
                  <b-col class="col-6">
                    <b-card id="3" no-body class="shadow-sm my-3" style="border: solid transparent; height: 90%" @click="formPrize = '3'">
                      <b-card-img-lazy
                        :src="'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E7%A5%9E%E5%9F%BC%E3%81%AE%E9%BA%BA%E8%A9%B0%E3%82%81%E5%90%88%E3%82%8F%E3%81%9B.jpg?alt=media&token=11541465-5271-4bdc-9c15-43f6a07b46b0'"
                        alt="image"
                      />
                      <b-card-text class="m-2" style="font-size: 14px">
                        神埼の麺詰め合わせ
                      </b-card-text>
                      <b-card-text class="m-2 mt-auto" style="font-size: 14px">
                        抽選 10名
                      </b-card-text>
                    </b-card>
                  </b-col>
                  <b-col class="col-6">
                    <b-card id="4" no-body class="shadow-sm my-3" style="border: solid transparent; height: 90%" @click="formPrize = '4'">
                      <b-card-img-lazy
                        :src="'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E5%B0%8F%E5%9F%8E1.jpg?alt=media&token=7fe2d690-b9b0-4468-a043-01e6d44c55b4'"
                        alt="image"
                      />
                      <b-card-text class="m-2" style="font-size: 14px">
                        フルーラ3種x4本セット
                      </b-card-text>
                      <b-card-text class="m-2 mt-auto" style="font-size: 14px">
                        抽選 10名
                      </b-card-text>
                    </b-card>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-4">
            <b-col class="col-12">
              <div class="d-flex">
                <h5>どなたと参加されましたか？</h5>
                <p style="color: red">&nbsp;*</p>
              </div>
              <b-form-radio-group
                v-model="formCompanion"
                :options="companionOption"
                class="my-2 col-12"
                value-field="item"
                text-field="name"
              />
              <b-form-input v-model="formCompanion2" class="col-6 ml-3" placeholder="その他" />
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-4">
            <b-col class="col-12">
              <div class="d-flex">
                <h5>一番印象に残った場所はどこですか？</h5>
                <p style="color: red">&nbsp;*</p>
              </div>
              <b-form-input v-model="formImpression" class="col-12 ml-3" />
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-4">
            <b-col class="col-12">
              <h5>各市町の印象についてお聞かせください</h5>
              <div class="d-flex col-12 align-items-center">
                <h6>佐賀市</h6>
                <b-form-textarea v-model="formImpressionSaga" rows="3" class="col-8 ml-auto" />
              </div>
              <div class="d-flex col-12 align-items-center">
                <h6>小城市</h6>
                <b-form-textarea v-model="formImpressionOgi" rows="3" class="col-8 ml-auto" />
              </div>
              <div class="d-flex col-12 align-items-center">
                <h6>神埼市</h6>
                <b-form-textarea v-model="formImpressionKanz" rows="3" class="col-8 ml-auto" />
              </div>
              <div class="d-flex col-12 align-items-center">
                <h6>多久市</h6>
                <b-form-textarea v-model="formImpressionTaku" rows="3" class="col-8 ml-auto" />
              </div>
              <div class="d-flex col-12 align-items-center">
                <h6>吉野ヶ里町</h6>
                <b-form-textarea v-model="formImpressionYoshi" rows="3" class="col-8 ml-auto" />
              </div>
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-4">
            <b-col class="col-12">
              <h5>以下の中で，「あったら是非参加したい」と思うイベントをお選びください</h5>
              <b-form-checkbox-group v-model="formEvents" class="col-12">
                <b-form-checkbox value="謎解き">謎解き</b-form-checkbox>
                <b-form-checkbox value="アウトドア">アウトドア</b-form-checkbox>
                <b-form-checkbox value="ウォーキング">ウォーキング</b-form-checkbox>
                <b-form-checkbox value="サイクリング">サイクリング</b-form-checkbox>
                <b-form-checkbox value="コンサート">コンサート</b-form-checkbox>
                <b-form-checkbox value="フード">フード</b-form-checkbox>
              </b-form-checkbox-group>
            </b-col>
          </b-row>
          <b-row class="text-center mt-5 mb-5">
            <b-col>
              <b-button v-if="isInValidName || isInValidPhone || isInValidZip || isInValidPrize || isInvalidImpression" class="btn-hover color-8" disabled>
                送信
              </b-button>
              <b-button v-else v-b-modal.confirm class="btn-hover color-1">
                送信
              </b-button>
              <p style="font-size: 12px">
                当選者の発表については，景品の発送をもって代えさせていただきます。<br>
              </p>
            </b-col>
          </b-row>
          <b-modal id="confirm" centered hide-footer hide-header>
            <div v-if="sending" class="text-center my-2">
              <b-spinner type="grow" label="Spinning" style="width: 3rem; height: 3rem;" class="my-3" />
              <h5>送信中</h5>
            </div>
            <div v-else class="text-center my-2">
              <h4>送信しますか？</h4>
              <div class="mt-4">
                <b-button class="mx-2" variant="primary" @click="send()">
                  はい
                </b-button>
                <b-button class="mx-2" variant="danger" @click="$bvModal.hide('confirm')">
                  いいえ
                </b-button>
              </div>
            </div>
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import firebase from '~/plugin/firebase'
import 'firebase/firestore'

const jsonpAdapter = require('axios-jsonp')
export default {
  name: 'Apply',
  data () {
    return {
      db: firebase.firestore(),
      selected: null,
      userInfo: this.$store.getters.userInfo,
      stampInfo: this.$store.getters.stampInfo,
      courseList: {},
      formName: '',
      formZip1: '',
      formZip2: '',
      formAddress1: '',
      formAddress2: '',
      formPrize: '1',
      formPhone1: '',
      formPhone2: '',
      formPhone3: '',
      formMail: '',
      formSex: '男性',
      formCompanion: '',
      formCompanion2: '',
      formImpression: '',
      formImpressionSaga: '',
      formImpressionOgi: '',
      formImpressionKanz: '',
      formImpressionTaku: '',
      formImpressionYoshi: '',
      formEvents: [],
      companionOption: [
        { item: '１人', name: '１人' },
        { item: '家族', name: '家族' },
        { item: '友人', name: '友人' },
        { item: '', name: 'その他' }
      ],
      sexOption: [
        { item: '男性', name: '男性' },
        { item: '女性', name: '女性' },
        { item: '未回答', name: '回答しない' }
      ],
      options: [
        { value: null, text: '選択してください' },
        { value: 1, text: '1' },
        { value: 2, text: '2' },
        { value: 3, text: '3' }
      ],
      searching: false,
      sending: false,
      prizeTitle: '',
      prizeImage: [],
      prizeDesc: [],
      prizeName: [],
      prizeNum: []
    }
  },
  computed: {
    isInValidName () {
      return this.formName.length < 1
    },
    isInValidZip () {
      const zip = this.formZip1 + this.formZip2
      return zip.length !== 7 || isNaN(Number(zip))
    },
    isInValidPhone () {
      const phone = this.formPhone1 + this.formPhone2 + this.formPhone3
      return phone.length < 10 || isNaN(Number(phone))
    },
    isInValidPrize () {
      return !this.formPrize
    },
    isInvalidImpression () {
      return this.formImpression < 2
    },
    faQuestionCircle () {
      return faQuestionCircle
    }
  },
  watch: {
    formPrize () {
      this.selectPrize()
    }
  },
  created () {
    this.getCourseInfo()
  },
  mounted () {
    this.$store.watch((state, getters) => getters.course.course,
      (newValue) => {
        this.courseList = newValue
      }
    )
    this.$store.watch((state, getters) => getters.userInfo.user,
      (newValue) => {
        this.userInfo = newValue
      })
  },
  methods: {
    getCourseInfo () {
      this.courseList = this.$store.state.course.course
      console.log('2', this.courseList)
    },
    openModal (id) {
      if (id === 1) {
        this.prizeTitle = 'まんなか佐賀さいこう賞'
        this.prizeImage = ['https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E4%BD%90%E8%B3%80%E7%89%9B%E3%83%AD%E3%83%BC%E3%82%B9.jpg?alt=media&token=eaf8cb5d-5989-4791-a801-13c2fd20a96b']
        this.prizeName = ['佐賀牛']
        this.prizeDesc = ['佐賀県が誇るブランド牛で、柔らかい赤身ときめ細かい霜降りが人気です。']
        this.prizeNum = ['5']
      } else if (id === 2) {
        this.prizeTitle = '佐賀まんなか賞'
        this.prizeImage = ['https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E5%90%89%E9%87%8E%E3%83%B6%E9%87%8C1.jpg?alt=media&token=edc97239-4d15-4775-8d27-aaf57d970ffd',
          'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E5%B0%8F%E5%9F%8E2.jpg?alt=media&token=08be4377-6a60-4ac2-9e35-6a2f49798ef4',
          'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E6%A3%9A%E7%94%B0%E7%B1%B3.jpg?alt=media&token=7311f528-a5cf-413d-a436-0814563b8828'
        ]
        this.prizeName = ['フォレストアドベンチャー ペア招待券', 'ブラックモンブラン ファミリーパックセット', '棚田米 5kg']
        this.prizeDesc = [
          'この招待券は1枚につき1名様無料でアドベンチャーバレーSAGA内の「フォレストアドベンチャー」を体験することができる券です。大人から子どもまで、幅広い世代に吉野ヶ里町の自然をお楽しみいただける施設です。',
          '竹下製菓の代表的商品、ブラックモンブラン、ミルクック、トラキチ君（バナナ味）、つぶみかんに加えて、一口サイズで食べやすくなったクランチチョコボールとスノーフレークを詰め合わせたバラエティ豊かなファミリーパックです。 \n' +
          'ご家族での団らんのひとときに最適です。',
          '多久市西多久町の平野地区で収穫された棚田米は、清らかな水と空気に育まれたおいしいお米です。'
        ]
        this.prizeNum = ['5', '3', '3']
      } else if (id === 3) {
        this.prizeTitle = '参加ありがとう賞'
        this.prizeImage = [
          'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E5%90%89%E9%87%8E%E3%83%B6%E9%87%8C2.jpg?alt=media&token=c3ddc558-955d-4118-b478-1f42f001f599',
          'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E4%B8%B8%E3%81%BC%E3%81%86%E3%82%8D%E8%A9%B0%E3%82%81%E5%90%88%E3%82%8F%E3%81%9B.jpg?alt=media&token=9e85adfc-531e-40ca-9cf8-7c9fa9cb3846',
          'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E7%A5%9E%E5%9F%BC%E3%81%AE%E9%BA%BA%E8%A9%B0%E3%82%81%E5%90%88%E3%82%8F%E3%81%9B.jpg?alt=media&token=11541465-5271-4bdc-9c15-43f6a07b46b0',
          'https://firebasestorage.googleapis.com/v0/b/stamprally2-6632c.appspot.com/o/prize%2F%E5%B0%8F%E5%9F%8E1.jpg?alt=media&token=7fe2d690-b9b0-4468-a043-01e6d44c55b4'
        ]
        this.prizeName = [
          'ひがしせふり温泉山茶花の湯 ペア招待券',
          '丸ぼうろ詰め合わせ',
          '神埼の麺詰め合わせ',
          'フルーラ3種x4本セット'
        ]
        this.prizeDesc = [
          'この招待券は1枚につき1名様無料で「ひがしせふり温泉 山茶花の湯」にご入浴できる券です。地元の新鮮な食材を使った料理や種類豊富なお風呂で1日の疲れを癒してください。',
          '',
          '神埼では、脊振（せふり）山系の良質の水と佐賀平野が生んだ小麦、恵まれた気候風土を活かし、製麺業が盛んになります。そのコシの強さ、喉ごしの良さはいまや神埼ブランドとして全国に知られ、夏は冷やしそうめん、冬はにゅうめんと年間を通じて楽しめます。',
          '「フルーラ」は香り豊かな果実のラムネです。\n' +
          '商品名の「フルーラ」は、果実の「フルーツ」と「ラムネ」の造語に、花のイメージの「フローラ」も兼ねています。ビー玉の入った瓶の可愛さはそのままに、マンゴーやライチ、ラ・フランスと、これまでにないバリエーションで世代を超えてお楽しみいただけます。'
        ]
        this.prizeNum = ['10', '10', '10', '10']
      }
      this.$bvModal.show('prizeModal')
    },
    scrollTop (id) {
      this.selected = id
      window.scroll(0, 0)
    },
    searchAddress () {
      const zip = this.formZip1 + this.formZip2
      if (zip && zip.length === 7 && zip.match(/^[\d]*$/)) {
        this.searching = true
        this.$axios({
          url: `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`,
          adapter: jsonpAdapter
        }).then((response) => {
          this.formAddress1 = response.data.results[0].address1 + response.data.results[0].address2 + response.data.results[0].address3
        }).catch((_error) => {
          this.$bvToast.toast('住所の取得に失敗しました。', {
            variant: 'danger'
          })
        }).finally(() => {
          setTimeout(() => {
            this.searching = false
          }, 3000)
        })
      } else {
        this.$bvToast.toast('郵便番号が正しく入力されていません。', {
          variant: 'danger'
        })
      }
    },
    async send () {
      this.sending = true
      const _this = this
      await this.db
        .collection('demo-appliedUsers')
        .doc(this.userInfo.clientId).set({
          name: String(_this.formName),
          zipcode: String(_this.formZip1) + '-' + String(_this.formZip2),
          address: String(_this.formAddress1) + String(_this.formAddress2),
          phone: String(_this.formPhone1) + '-' + String(_this.formPhone2) + '-' + String(_this.formPhone3),
          mail: String(_this.formMail),
          prize: _this.detectPrize(),
          applyDate: new Date(),
          course: _this.detectCourse(),
          age: _this.userInfo.age,
          sex: _this.formSex,
          companion: _this.formCompanion + _this.formCompanion2,
          impression: _this.formImpression,
          comment: [_this.formImpressionSaga, _this.formImpressionOgi, _this.formImpressionKanz, _this.formImpressionTaku, _this.formImpressionYoshi],
          events: _this.formEvents
        })
      await this.db
        .collection('demo-users')
        .doc(this.userInfo.clientId).update({
          applied: _this.selected
        })
      this.userInfo.applied = this.selected
      this.selected = null
      this.sending = false
      this.$bvModal.hide('confirm')
      this.$bvToast.toast('応募が完了しました！', {
        variant: 'info'
      })
      await this.$router.push({ path: '/home' })
    },
    detectCourse () {
      if (this.selected === 1) {
        return 'まんなか佐賀さいこう賞'
      } else if (this.selected === 2) {
        return '佐賀まんなか賞'
      } else if (this.selected === 3) {
        return '参加ありがとう賞'
      }
    },
    detectPrize () {
      console.log(this.selected, this.formPrize)
      if (this.selected === 1) {
        return '佐賀牛'
      } else if (this.selected === 2) {
        if (this.formPrize === '1') {
          return 'フォレストアドベンチャー'
        } else if (this.formPrize === '2') {
          return 'ブラックモンブラン'
        } else if (this.formPrize === '3') {
          return '棚田米'
        }
      } else if (this.selected === 3) {
        if (this.formPrize === '1') {
          return '山茶花の湯'
        } else if (this.formPrize === '2') {
          return '丸ぼうろ'
        } else if (this.formPrize === '3') {
          return '神埼の麺'
        } else if (this.formPrize === '4') {
          return 'フルーラ'
        }
      }
    },
    selectPrize () {
      document.getElementById('1').style.border = 'solid transparent'
      document.getElementById('2').style.border = 'solid transparent'
      document.getElementById('3').style.border = 'solid transparent'
      if (document.getElementById('4')) {
        document.getElementById('4').style.border = 'solid transparent'
      }
      document.getElementById(this.formPrize).style.border = 'solid #007bff'
    }
  }
}
</script>

<style scoped>
.btn-hover {
  width: 140px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 60px;
  text-align:center;
  border: none;
  background-size: 300% 100%;

  border-radius: 50px;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-1 {
  background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
.btn-hover.color-8 {
  background-image: linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376);
  box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}

</style>
