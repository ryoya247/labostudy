<template>
  <div id="wrapper">
    <div id="page-wrapper" class="light-gray-bg dashbard-1" v-if="isMatchPath">
    <!-- MainView -->
      <article  :class="{ 'full-column' : !open }" class="wrapper wrapper-content main-column">
        <section class="animated fadeInRight">
          <!-- profileItem -->
          <div class="ibox">
            <div class="ibox-title">
              <div class="ibox-tools">
                <span class="info-menu">
                  <!-- プロフィール -->
                  {{ $t("viewName.profile") }}
                </span>
                <span class="info-right">
                </span>
              </div>
            </div>
            <!-- UserElement -->
            <div class="ibox-child">
              <div class="flex-box">
                <span class="info-profimg">
                  <img v-if="getTargetUser.userIcon" :src="getTargetUser.userIcon" :alt="getTargetUser.userName" class="img-circle">
                  <img v-else :src="'static/img/noImage.png'" alt="noImage" class="img-circle">
                </span>

                <div class="profile-box">
                  <div class="info-profelement ibox-child row">
                    <label class="col-md-4">{{$t('profileUserTitle')}}</label>
                    <div class="col-md-8">
                      <span>{{ getTargetUser.userName }}</span>
                    </div>
                  </div>
                    <div class="info-profelement ibox-child row">
                      <label class="col-md-4">{{$t('departmentStr')}}</label>
                      <div class="col-md-8">
                        <span> {{ getTargetUser.dept }}</span>
                      </div>
                    </div>
                  </div>
                  <span class="info-statusimg dropdown">
                    <img v-if="getTargetUser.userFeeling == 'sunny'" alt="sunny" class="img-circle" src="static/img/assets/status_01.png">
                    <img v-else-if="getTargetUser.userFeeling == 'rainy'"  alt="rainy" class="img-circle" src="static/img/assets/status_03.png">
                    <img v-else alt="cloudy" class="img-circle" src="static/img/assets/status_02.png">
                  </span>
                </div>
              </div>
              <!-- /UserElement -->
              <!-- Comment -->
              <div class="ibox-child">
                <div class="row">
                  <div class="form-group col-sm-12">
                    <label class="control-label">{{$t('profileBioTitle')}}</label>
                    <span class="prof-item">{{ getTargetUser.userBio }}</span>
                  </div>
                </div>
              </div>
              <!-- /Comment -->

              <!-- Mail -->
              <div class="ibox-child">
                <div class="row">
                  <div id="limited" class="date form-group col-sm-3">
                    <label class="control-label">{{$t('profileMailTitle')}}</label>
                  </div>
                  <div class="form-group col-sm-9">
                    <div class="input-group">
                      <span><a :href='"mailto:" + getTargetUser.userEmail'>{{ getTargetUser.userEmail }}</a></span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /Mail -->
              <!-- Tel -->
              <div class="ibox-child">
                <div class="row">
                  <div id="limited" class="date form-group col-sm-3">
                    <label class="control-label">{{$t('profilePhoneTitle')}}</label>
                  </div>
                  <div class="form-group col-sm-9">
                    <div class="input-group">
                      <span><a :href='"tel:" + getTargetUser.userPhone'>{{ getTargetUser.userPhone }}</a></span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /Tel -->

              <!-- Carrer -->
              <div class="ibox-child">
                <div class="row">
                  <div class="form-group col-sm-12">
                    <label class="control-label">{{$t('profileSummarayTitle')}}</label>
                    <span class="prof-item">
                      <read-more :text="getTargetUser.careerSummary" :addMore="true" :detailView="false" :showMore="this.carrerShowMore" :contentHeight="this.carrerContentHeight" @update-show-more="updateCarrerShowMore" @update-content-height="updateCarrerContentHeight">
                        <span class="prof-item">
                          {{ getTargetUser.careerSummary }}
                        </span>
                      </read-more>
                    </span>
                  </div>
                </div>
              </div>
              <!-- /Carrer -->
              <other-items v-if="$route.params.userId !== 'profile'" :userId="this.userId" :index="this.chekTabIndex" v-on:set-target="setTarget"/>
            </div>
            <!-- /profileItem -->

        </section>
      </article>

      <!-- テスト確認用 -->
      <!-- DetailView -->
      <div id="detailView" class="sub-column" :class="{ 'sub-active' : open }">
        <div class="close-content"><div @click="open = false" class="close-btn cursor"><i class="fa fa-angle-right"></i></div></div>
        <article class="sub-content-wrap">
          <section class="inner-wrap">
            <div class="s-inner-wrap">
              <div v-if="this.getTargetType === 'objectives' || this.getTargetType === 'keyresults'">
                <div class="ibox-title flex-box fl-between ibox-detail-header">
                  <span class="info-menu flex-box">
                    <template v-if="!this.getTargetObjective.targetItem.parentObjId">{{$t('okrDetailType')}}</template>
                    <template v-if="this.getTargetObjective.targetItem.parentObjId">{{$t('keyResultDetailType')}}</template>
                  </span>
                  <span class="info-right">{{$t('createDateString')}} : {{this.getTargetObjective.targetItem.createdAt |  preparedTime}}</span>
                </div>
                <!-- <template v-if="targetItem && targetItem.contentText"> -->
                  <div ref="detail"  id="detail" class="ibox-title detail-head">
                    <!-- <objective v-if="getTargetItem && getTargetItem.contentText" :detailView="true" :content="getTargetItem.contentText" :progress="getTargetItem.progress ? getTargetItem.progress : '0'" :setReadOnly="checkCanMoveDetailProgress" :isComplete="getTargetItem.isComplete ? true : false" v-on:set-progress="updateProgressInfo" ref="progress" :objective="false" /> -->
                    <objective v-if="this.getTargetObjective.targetItem && this.getTargetObjective.targetItem.contentText" :detailView="true" :itemId="this.getTargetObjective.targetItemKey" :content="this.getTargetObjective.targetItem.contentText" :progress="this.getTargetObjective.targetItem.progress ? '' + this.getTargetObjective.targetItem.progress : '0'" :setReadOnly="'false'" v-on:set-progress="updateProgressInfo" :objective="false" />
                    <span class="info-comment-detail due-date due-date-color">{{$t('dueDateStr')}} : {{this.getTargetObjective.targetItem.dueDate}}</span>
                    <div class="ibox-tools">
                      <span class="info-menu"></span>
                      <span class="info-right">
                      </span>
                    </div>
                    <!-- <span class="due-date due-date-color">{{$t('dueDateStr')}} : {{targetItem.dueDate}}</span> -->
                  </div>
                  <div class="ibox-child public-wrap">
                    <div class="row">
                      <div class="form-group col-sm-12 info-status public-detail-status">
                        <div class="public-detail">
                          <div class="">
                            <label class="control-label status-label" for="status">{{$t('releaseLabelTitle')}}</label>
                            <span v-if="!this.getTargetObjective.targetItem.limitedAccess">{{$t('allPeopleStrType')}}</span>
                            <span v-else-if="this.getTargetObjective.targetItem.limitedAccess.limitedUsers">{{$t('userBtnTile')}}</span>
                            <span v-else-if="this.getTargetObjective.targetItem.limitedAccess.limitedGroup">{{$t('peopleGroupTileType')}}</span>
                          </div>
                        </div>
                        <div v-if="this.getTargetObjective.targetItem.limitedAccess" class="public-box">
                          <div v-if="this.getTargetObjective.targetItem.limitedAccess.limitedUsers">
                            <ul>
                              <li v-for="limited in getTargetLimitedAccess" :key="limited.id" class="public-cell">
                                <span class="public-userimg">
                                  <img alt="image" v-if="limited.userInfo.userIcon" class="img-circle" :src="limited.userInfo.userIcon" />
                                  <img alt="image" v-else class="img-circle"  :src="'static/img/noImage.png'" />
                                </span>
                                <div class="public-userinfo"><span class="public-username">{{limited.userInfo.userName}}</span></div>
                              </li>
                            </ul>
                          </div>
                          <div v-else-if="this.getTargetObjective.targetItem.limitedAccess.limitedGroup" class="public-detail-group">
                            <ul><li><span class="public-username">{{(getTargetLimitedAccess[this.getTargetObjective.targetItem.limitedAccess.limitedGroup]||{}).groupName||'** Group is removed. **'}}</span></li></ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ib-sub-content">
                    <b-tabs>
                      <b-tab @click="showCommentForm" :title="$t('commentLabelTitle')">
                        <div class="tab-pane">
                          <div class="panel-body">
                            <div v-if="!getTargetComments" class="comment-view ibox-child"><span class="comment-text">{{$t('stillNotCommentStr')}}</span></div>
                            <div v-for="obj in getTargetComments" :key="obj.id" class="ibox-child" v-if="!obj.parentId">
                              <comment-item @set-reply="setParentCommentId" :Comments="obj"/>
                            </div>
                          </div>
                        </div>
                      </b-tab>
                      <b-tab @click="notShowCommentForm" :title="$t('relatedOkrType')">
                        <div class="tab-pane">
                          <div class="panel-body">
                            <div v-for="obj in this.getTargetObjective.targetItem.relations" :key="obj.id" v-if="obj.type" class="ibox-child">
                              <relation-item :itemId="obj.key" :userId="obj.userId" :type="obj.type" v-on:get-detail="getDetail"/>
                            </div>
                          </div>
                        </div>
                      </b-tab>
                    </b-tabs>
                  </div>
                <!-- </template> -->
              </div>
              <div v-else-if="getTargetType.match(/1on1s_/)">
                <div class="ibox-title flex-box fl-between ibox-detail-header">
                  <span class="info-menu flex-box">
                    <template v-if="this.getTargetOneItem.targetOneItem.contents">{{ this.getTargetOneItem.targetOneItem.date }}{{$t('retrospectiveLabelStr')}}</template>
                  </span>
                  <span class="info-right">
                  </span>
                </div>
                <!-- 1on1-detail1 -->
                <!-- <div id="one-detail1" class="ibox"> -->
                <div class="ibox-title detail-head">
                  <div class="flex-box cursor">
                    <img v-if="this.getTargetOneItem.targetOneContent === 0" class="one-icon" src="static/img/1on1/img02.png" alt="">
                    <img v-else-if="this.getTargetOneItem.targetOneContent === 1" class="one-icon" src="static/img/1on1/img01.png" alt="">
                    <img v-else-if="this.getTargetOneItem.targetOneContent === 2" class="one-icon" src="static/img/1on1/img03.png" alt="">
                    <img v-else-if="this.getTargetOneItem.targetOneContent === 3" class="one-icon" src="static/img/1on1/img04.png" alt="">
                    <!-- <img class="one-icon" src="static/img/1on1/img05.png" alt=""> -->
                    <div class="comment">
                      <template v-if="this.getTargetOneItem.targetOneContent === 0">
                        <h4 class="h3">{{$t('firstContent1on1')}}</h4>
                        <read-more :targetId="this.getTargetOneItem.targetOneItemKey" :text="this.getTargetOneItem.targetOneItem.contents[0]" :addMore="true" :showMore="this.propShowMore" :contentHeight="this.propContentHeight" @update-show-more="updateShowMore" @update-content-height="updateContentHeight">{{this.getTargetOneItem.targetOneItem.contents[0]}}</read-more>
                      </template>
                      <template v-else-if="targetOneContent === 1">
                        <h4 class="h3">{{$t('secondContent1on1')}}</h4>
                        <read-more :targetId="this.getTargetOneItem.targetOneItemKey" :text="this.getTargetOneItem.targetOneItem.contents[1]" :addMore="true" :showMore="this.propShowMore" :contentHeight="this.propContentHeight" @update-show-more="updateShowMore" @update-content-height="updateContentHeight">{{this.getTargetOneItem.targetOneItem.contents[1]}}</read-more>
                      </template>
                      <template v-else-if="targetOneContent === 2">
                        <h4 class="h3">{{$t('thirdContent1on1')}}</h4>
                        <read-more :targetId="this.getTargetOneItem.targetOneItemKey" :text="this.getTargetOneItem.targetOneItem.contents[2]" :addMore="true" :showMore="this.propShowMore" :contentHeight="this.propContentHeight" @update-show-more="updateShowMore" @update-content-height="updateContentHeight">{{this.getTargetOneItem.targetOneItem.contents[2]}}</read-more>
                      </template>
                      <template v-else-if="targetOneContent === 3">
                        <h4 class="h3">{{$t('forthContent1on1')}}</h4>
                        <read-more :targetId="this.getTargetOneItem.targetOneItemKey" :text="this.getTargetOneItem.targetOneItem.contents[3]" :addMore="true" :showMore="this.propShowMore" :contentHeight="this.propContentHeight" @update-show-more="updateShowMore" @update-content-height="updateContentHeight">{{this.getTargetOneItem.targetOneItem.contents[3]}}</read-more>
                      </template>
                      <!-- <template v-else>
                        <h4 class="h3">{{$t('fiveContent1on1')}}</h4>
                        <read-more :text="this.targetOneItem.memo" :addMore="true" :showMore="this.propShowMore" :contentHeight="this.propContentHeight" @update-show-more="updateShowMore" @update-content-height="updateContentHeight">{{this.targetOneItem.memo}}</read-more>
                      </template> -->
                    </div>
                  </div>
                </div>
                <!-- public -->
                <div class="ibox-child public-wrap">
                  <div class="row">
                    <div class="form-group col-sm-12 info-status public-detail-status">
                      <div class="public-detail">
                        <div>
                          <label class="control-label status-label" for="status">{{$t('releaseLabelTitle')}}</label>
                          <span v-if="!this.getTargetOneItem.targetOneItem.limitedAccess">{{$t('allPeopleStrType')}}</span>
                          <span v-else-if="this.getTargetOneItem.targetOneItem.limitedAccess.limitedUsers">{{$t('userBtnTile')}}</span>
                          <span v-else-if="this.getTargetOneItem.targetOneItem.limitedAccess.limitedGroup">{{$t('peopleGroupTileType')}}</span>
                        </div>
                      </div>
                      <div v-if="this.getTargetOneItem.targetOneItem.limitedAccess" class="public-box">
                        <div v-if="this.getTargetOneItem.targetOneItem.limitedAccess.limitedUsers">
                          <ul>
                            <li v-for="limited in getTargetLimitedAccess" :key="limited.id" class="public-cell">
                              <span class="public-userimg">
                                <img v-if="limited.userInfo.userIcon" :src="limited.userInfo.userIcon" alt="image" class="img-circle">
                                <img v-else :src="'static/img/noImage.png'" alt="image" class="img-circle">
                              </span>
                              <div class="public-userinfo"> <span class="public-username">{{limited.userInfo.userName}}</span> </div>
                            </li>
                          </ul>
                        </div>
                        <div v-else-if="this.getTargetOneItem.targetOneItem.limitedAccess.limitedGroup" class="public-detail-group">
                          <ul>
                            <li><span class="public-username">{{(getTargetLimitedAccess[this.getTargetOneItem.targetOneItem.limitedAccess.limitedGroup]||{}).groupName||'** Group is removed. **'}}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- public -->
                <div v-if="this.getTargetType !== '1on1s_memo'" class="ib-sub-content">
                  <b-tabs class="single-tabs">
                    <b-tab :title="$t('commentLabelTitle')">
                      <div class="panel-body">
                        <!-- コメント -->
                        <div v-if="!getTargetComments[0]" class="comment-view ibox-child">{{$t('stillNotCommentStr')}}</div>
                        <div v-else class="one-comment-view">
                          <div v-for="obj in getTargetComments" :key="obj.id" class="ibox-child" v-if="!obj.parentId">
                            <comment-item @set-reply="setParentCommentId" :Comments="obj"/>
                          </div>
                        </div>
                        <!-- /コメント -->
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
                <!-- /ib-sub-content -->
                <!-- </div> -->
                <!-- /1on1-detail -->
              </div>
              <div v-else-if="getTargetType === 'rtfbs'">
                <div v-if="targetFeed.contentText" class="ibox-title flex-box fl-between ibox-detail-header">
                  <span class="info-menu flex-box">{{$t('rtfbType')}}</span>
                  <span class="info-right">
                    <span class="info-time">{{ this.getTargetFbRequest.targetFeed.createdAt | preparedTime }}</span>
                  </span>
                </div>
                <!-- <div id="fb-detail1" class="ibox"> -->
                  <div class="ibox-title detail-head">
                    <div class="flex-box">
                      <span class="info-userimg">
                        <img v-if="this.getTargetFbRequest.targetUserIcon" alt="image" class="img-circle" :src="this.getTargetFbRequest.targetUserIcon">
                        <img v-else alt="image" class="img-circle" :src="'static/img/noImage.png'">
                      </span>
                      <div class="comment">
                        <div class="info-userelement">
                          <a href="#">
                            <span class="info-username">{{ this.getTargetFbRequest.targetUserName }}</span>
                          </a>
                          <span class="info-time">
                            <!-- {{ this.targetFeed.createdAt | preparedTime }} -->
                          </span>
                        </div>
                        <span class="comment-text">
                          <read-more :targetId="this.getTargetFbRequest.targetFeedKey" :text="this.getTargetFbRequest.targetFeed.contentText" :addMore="true" :showMore="this.propShowMore" :contentHeight="this.propContentHeight" @update-show-more="updateShowMore" @update-content-height="updateContentHeight">
                            {{ this.getTargetFbRequest.targetFeed.contentText }}
                          </read-more>
                        </span>
                        <div v-if="getTargetFeed.uploadedFile" class="image-add">
                          <div class="uploaded-images" v-viewer="{
                            button: true,
                            navbar: false,
                            title: false,
                            toolbar: false,
                            tooltip: false,
                            movable: true,
                            zoomable: true,
                            rotatable: true,
                            scalable: false,
                            transition: true,
                            fullscreen: true,
                            keyboard: false }" @click.stop>
                            <img :src="getTargetFeed.uploadedFile">
                          </div>
                        </div>
                        <div class="child-tools">
                          <span class="info-menu">
                            <a class="info-comment" href="#">
                              <img src="static/img/assets/comment.png">
                              <span>{{ getCommentsByItemId(getTargetFeedKey,'rtfbs').length }}</span>
                            </a>
                            <a class="info-comment">
                              <img v-if="isLiked(getTargetFeed)" @click.stop="onClickStarLiked(getTargetFeed, getTargetFeedKey)" :src="'static/img/assets/nice_on.png'">
                              <img v-else @click.stop="onClickStarNotLiked(getTargetFeed, getTargetFeedKey)" :src="'static/img/assets/nice_off.png'">
                              <span>{{ getTargetFeed.likes ? Object.keys(getTargetFeed.likes).length : 0 }}</span>
                            </a>
                          </span>
                          <!-- <span class="info-right">
                            <fb-drop-down v-if="getUserId == getTargetFeed.userId" :item="getTargetFeed" :id="getTargetFeedKey"/>
                          </span> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 公開設定detail -->
                  <div class="ibox-child ublic-wrap">
                    <div class="row">
                      <div class="form-group col-sm-12 info-status public-detail-status">
                        <div class="public-detail">
                          <div>
                            <label class="control-label status-label" for="status">{{$t('releaseLabelTitle')}}</label>
                            <span v-if="!this.getTargetFbRequest.targetFeed.limitedAccess">{{$t('allPeopleStrType')}}</span>
                            <span v-else-if="this.getTargetFbRequest.targetFeed.limitedAccess.limitedUsers">{{$t('userBtnTile')}}</span>
                          <span v-else-if="this.getTargetFbRequest.targetFeed.limitedAccess.limitedGroup">{{$t('peopleGroupTileType')}}</span>
                          </div>
                        </div>
                        <div v-if="this.getTargetFbRequest.targetFeed.limitedAccess" class="public-box">
                          <div v-if="this.getTargetFbRequest.targetFeed.limitedAccess.limitedUsers">
                            <ul>
                              <li v-for="limited in getTargetLimitedAccess" :key="limited.id" class="public-cell">
                                <!-- {{limited}} -->
                                <span class="public-userimg">
                                  <img v-if="limited.userInfo.userIcon" :src="limited.userInfo.userIcon" alt="image" class="img-circle">
                                  <img v-else :src="'static/img/noImage.png'" alt="image" class="img-circle">
                                </span>
                                <div class="public-userinfo">
                                  <span class="public-username">{{limited.userInfo.userName}}</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div v-else-if="this.getTargetFbRequest.targetFeed.limitedAccess.limitedGroup" class="public-detail-group">
                            <ul><li><span class="public-username">{{(getTargetLimitedAccess[this.getTargetFbRequest.targetFeed.limitedAccess.limitedGroup]||{}).groupName||'** Group is removed. **'}}</span></li></ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /公開設定detail -->
                  <div class="ib-sub-content">
                    <b-tabs>
                      <b-tab @click="showCommentForm" :title="$t('commentLabelTitle')">
                        <div class="one-comment-view">
                          <div v-for="obj in getTargetComments" :key="obj.id" class="ibox-child" v-if="!obj.parentId">
                            <comment-item @set-reply="setParentCommentId" :Comments="obj"/>
                          </div>
                        </div>
                      </b-tab>
                      <b-tab @click="notShowCommentForm" :title="$t('relatedOkrType')">
                        <div class="ibox-content search-resultview">
                          <ul v-if="this.getTargetFeed.likes">
                            <li v-for="(value, key) in getTargetFeed.likes" :key="value.id" v-if="getTargetFeed.likes">
                              <template>
                                <router-link :to="{ name: 'User', params: { userId: key }}">
                                  <div class="cursor">
                                    <span class="search-userimg">
                                      <img v-if="getUsers[key].userInfo.userIcon" :src="getUsers[key].userInfo.userIcon" alt="image" class="img-circle">
                                      <img v-else :src="'static/img/noImage.png'" alt="image" class="img-circle">
                                    </span>
                                    <span class="search-username">{{ getUsers[key].userInfo.userName }}</span>
                                  </div>
                                </router-link>
                              </template>
                            </li>
                          </ul>
                          <ul v-else>
                            <li>{{$t('stillNotLikesStr')}}</li>
                          </ul>
                        </div>
                      </b-tab>
                    </b-tabs>
                  </div>
                  <!-- /ibox-child -->
                <!-- </div> -->
              </div>
            </div>
          </section>
          <article v-if="isShowCommentForm" class="sub-column-comment sub-column-active">
            <section>
              <comment-form @close-event="open = false" ref="setReply" :parentItem="this.replyParent" :targetId="getTargetKey" :target="this.targetType" :userId="this.userId"/>
            </section>
          </article>
        </article>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {storage} from '@/main'
import CommonJs from '@/js/common'
import ProfileDropDown from '@/components/User/ProfileDropDown'
import OtherItems from '@/components/User/OtherItems'
import CommentItem from '@/components/Comment/CommentItem'
import RelationItem from '@/components/Okr/RelationItem'
import CommentForm from '@/components/Comment/CommentForm'
import Objective from '@/components/Okr/Objective'
import moment from 'moment'
import ReadMore from '@/components/ReadMore/ReadMoreComponent'

export default {
  name: 'User',
  mixins: [CommonJs],
  // mixedins: [validationMixin],
  components: {
    ProfileDropDown,
    OtherItems,
    CommentForm,
    RelationItem,
    Objective,
    CommentItem,
    ReadMore
  },
  // store,
  data: function () {
    return {
      tag: 'progress',
      // edit: false,
      tabIndex: 0,
      userInfo: {
        userName: '',
        dept: '',
        userIcon: '',
        userFeeling: '',
        userBio: '',
        userEmail: '',
        userPhone: '',
        careerSummary: ''
      },
      propShowMore: false,
      propContentHeight: 0,
      carrerShowMore: false,
      carrerContentHeight: 0,
      open: false,
      userId: '',
      editInfo: {
        userName: '',
        dept: '',
        userFeeling: '',
        userBio: '',
        userEmail: '',
        userPhone: '',
        careerSummary: ''
      },
      uploadImage: '',
      cropImage: '',
      myCroppa: {},
      // objective
      targetItem: {
        progress: '0',
        contentText: '',
        createdAt: '',
        dueDate: '',
        limitedAccess: {},
        relations: {}
      },
      targetType: 'objectives',
      targetItemProgress: '0',
      targetItemKey: '',
      targetKeyresults: {},
      // 1on1
      targetOneItem: {},
      targetOneItemKey: '',
      targetOneContent: 0,
      // feedback
      feedItems: {},
      detail: {},
      targetFeed: {},
      targetFeedKey: '',
      // targetType: 'rtfbs',
      targetUserId: '',
      targetUserName: '',
      targetUserIcon: '',
      targetContent: '',
      targetComments: {},
      replyParent: {},
      isShowCommentForm: true
    }
  },
  computed: {
    isMatchPath () {
      return this.$route.name === 'User'
    },
    ...mapGetters([
      'getUserId'
    ]),
    ...mapGetters('comments/', [
      'getCommentsByItemId'
    ]),
    ...mapGetters('peoples/', [
      'getUsers',
      'getUserById',
      'getUsersByIds',
      'getGroupsByIds'
    ]),
    ...mapGetters('rtfbs/', [
      'getRtfbsByUserId',
      'getRtfbs'
    ]),
    ...mapGetters('ones/', [
      'get1on1sByUserId'
    ]),
    ...mapGetters('okrs/', [
      'getKeyresultsByParentObjId',
      'getObjectivesByUserId',
      'getKeyresultById',
      'getKeyresultsByUserId'
    ]),
    chekTabIndex: {
      get: function () {
        return this.tabIndex
      },
      set: function (value) {
        this.tabIndex = value
      }
    },
    getTargetType: {
      get: function () {
        return this.targetType
      },
      set: function (value) {
        this.targetType = value
      }
    },
    getTargetObjective: {
      get: function () {
        let targetItem = {
          targetItem: this.targetItem,
          targetItemKey: this.targetItemKey
        }
        console.log('getTargetObjective:relations:chkKeys', targetItem)
        if (targetItem.targetItem.relations) {
          let chkKeys = {}
          for (let k of Object.keys(targetItem.targetItem.relations)) {
            let chk = targetItem.targetItem.relations[k]
            let chkKey = [chk.type, chk.userId, chk.key].join('_')
            if (chkKeys[chkKey]) {
              delete targetItem.targetItem.relations[k]
            } else {
              chkKeys[chkKey] = true
            }
            console.log('getTargetObjective:relations:chkKeys', chkKey, chkKeys)
          }
        }
        return targetItem
      },
      set: function (value) {
        this.getTargetType = value.targetType
        this.targetItem = value.targetItem
        this.targetItemKey = value.targetItemKey
      }
    },
    getTargetOneItem: {
      get: function () {
        let targetItem = {
          targetOneItem: this.targetOneItem,
          targetOneItemKey: this.targetOneItemKey,
          targetOneContent: this.targetOneContent
        }
        return targetItem
      },
      set: function (value) {
        this.getTargetType = value.targetType
        this.targetOneItem = value.targetOneItem
        this.targetOneItemKey = value.targetOneItemKey
        this.targetOneContent = value.targetContent
      }
    },
    getTargetFbRequest: {
      get: function () {
        let targetItem = {
          targetFeed: this.targetFeed,
          targetFeedKey: this.targetFeedKey,
          targetUserName: this.targetUserName,
          targetUserIcon: this.targetUserIcon
        }
        return targetItem
      },
      set: function (value) {
        this.getTargetType = value.targetType
        this.targetFeed = value.targetFeed
        this.targetFeedKey = value.targetFeedKey
        this.targetUserName = value.targetUserName
        this.targetUserIcon = value.targetUserIcon
      }
    },
    getTargetComments () {
      if (this.getTargetType === 'objectives' || this.getTargetType === 'keyresults') {
        return this.getCommentsByItemId(this.getTargetObjective.targetItemKey, this.getTargetType)
      } else if (this.getTargetType.match(/1on1s_/)) {
        return this.getCommentsByItemId(this.getTargetOneItem.targetOneItemKey, this.getTargetType)
      } else if (this.getTargetType === 'rtfbs') {
        return this.getCommentsByItemId(this.getTargetFbRequest.targetFeedKey, this.getTargetType)
      } else {
        return {}
      }
    },
    getRelationLength () {
      return this.targetItem.relations ? Object.keys(this.targetItem.relations).length : 0
    },
    getTargetLimitedAccess () {
      if (this.getTargetType === 'objectives' || this.getTargetType === 'keyresults') {
        if (!this.getTargetObjective.targetItem.limitedAccess) {
          return {}
        } else if (this.getTargetObjective.targetItem.limitedAccess.limitedUsers) {
          return this.getUsersByIds(Object.keys(this.getTargetObjective.targetItem.limitedAccess.limitedUsers))
        } else if (this.getTargetObjective.targetItem.limitedAccess.limitedGroup) {
          return this.getGroupsByIds([this.getTargetObjective.targetItem.limitedAccess.limitedGroup])
        }
      } else if (this.getTargetType.match(/1on1s_/)) {
        if (!this.getTargetOneItem.targetOneItem.limitedAccess) {
          return {}
        } else if (this.getTargetOneItem.targetOneItem.limitedAccess.limitedUsers) {
          return this.getUsersByIds(Object.keys(this.getTargetOneItem.targetOneItem.limitedAccess.limitedUsers))
        } else if (this.getTargetOneItem.targetOneItem.limitedAccess.limitedGroup) {
          return this.getGroupsByIds([this.getTargetOneItem.targetOneItem.limitedAccess.limitedGroup])
        }
      } else if (this.getTargetType === 'rtfbs') {
        if (!this.getTargetFbRequest.targetFeed.limitedAccess) {
          return {}
        } else if (this.getTargetFbRequest.targetFeed.limitedAccess.limitedUsers) {
          return this.getUsersByIds(Object.keys(this.getTargetFbRequest.targetFeed.limitedAccess.limitedUsers))
        } else if (this.getTargetFbRequest.targetFeed.limitedAccess.limitedGroup) {
          return this.getGroupsByIds([this.getTargetFbRequest.targetFeed.limitedAccess.limitedGroup])
        }
      } else {
        return {}
      }

      // if (!this.targetItem.limitedAccess) {
      //   return {}
      // } else if (this.targetItem.limitedAccess.limitedUsers) {
      //   return this.getUsersByIds(Object.keys(this.targetItem.limitedAccess.limitedUsers))
      // } else if (this.targetItem.limitedAccess.limitedGroup) {
      //   return this.getGroupsByIds([this.targetItem.limitedAccess.limitedGroup])
      // }
    },
    getTargetKey () {
      if (this.targetType === 'objectives' || this.targetType === 'keyresults') {
        return this.targetItemKey
      } else if (this.targetType.match(/1on1s_/)) {
        return this.targetOneItemKey
      } else if (this.targetType === 'rtfbs') {
        return this.targetFeedKey
      }
    },
    getTargetFeed () {
      return this.getRtfbs[this.getTargetFbRequest.targetFeedKey] ? this.getRtfbs[this.getTargetFbRequest.targetFeedKey] : {}
    },
    getTargetFeedKey () {
      return this.getTargetFbRequest.targetFeedKey
    },
    checkReadOnly () {
      if (this.userId === this.getUserId) return 'true'
      else return 'false'
    },
    getTargetUser: {
      get: function () {
        let targetUserInfo = {
          userName: this.userInfo.userName,
          dept: this.userInfo.dept,
          userFeeling: this.userInfo.userFeeling,
          userBio: this.userInfo.userBio,
          userEmail: this.userInfo.userEmail,
          userPhone: this.userInfo.userPhone,
          careerSummary: this.userInfo.careerSummary
        }
        if (this.userInfo.userIcon) {
          targetUserInfo.userIcon = this.userInfo.userIcon
        }
        return targetUserInfo
      },
      set: function (value) {
        this.userInfo.userName = value.userName
        this.userInfo.dept = value.dept
        this.userInfo.userFeeling = value.userFeeling
        this.userInfo.userBio = value.userBio
        this.userInfo.userEmail = value.userEmail
        this.userInfo.userPhone = value.userPhone
        this.userInfo.careerSummary = value.careerSummary
        if (value.userIcon) {
          this.userInfo.userIcon = value.userIcon
        } else {
          this.userInfo.userIcon = ''
        }
      }
    }
  },
  updated: function () {
    // console.log('in update route params', this.$route.params)
    if (this.$route.params.userId && !this.$route.params.visit) {
      this.userId = this.$route.params.userId
      console.log('this.$route.params.userId:::::::::::::::', this.$route.params.userId)
      this.setVisit(this.userId)
      const userId = this.userId
      const user = this.getUsersByIds([userId])
      if (user) {
        // console.log('user', user)
        let userInfo = {
          userName: user[userId].userInfo.userName,
          dept: user[userId].userInfo.dept,
          userFeeling: user[userId].userInfo.userFeeling,
          userBio: user[userId].userInfo.userBio,
          userEmail: user[userId].userInfo.userEmail,
          userPhone: user[userId].userInfo.userPhone,
          careerSummary: user[userId].userInfo.careerSummary
        }
        if (user[userId].userInfo.userIcon) {
          userInfo.userIcon = user[userId].userInfo.userIcon
        }
        this.getTargetUser = userInfo
        // this.userInfo.userName = user[userId].userInfo.userName
        // this.userInfo.dept = user[userId].userInfo.dept
        // this.userInfo.userFeeling = user[userId].userInfo.userFeeling
        // this.userInfo.userBio = user[userId].userInfo.userBio
        // this.userInfo.userEmail = user[userId].userInfo.userEmail
        // this.userInfo.userPhone = user[userId].userInfo.userPhone
        // this.userInfo.careerSummary = user[userId].userInfo.careerSummary
        // if (user[userId].userInfo.userIcon) {
        //   this.userInfo.userIcon = user[userId].userInfo.userIcon
        // }
        console.log('this.$route.params.item::::', this.$route.params.item)
        if (this.$route.params.item) {
          const $t = this.$t
          let key = Object.keys(this.$route.params.item)
          let value = Object.values(this.$route.params.item)
          console.log('User.vue:updated', key, value)
          if (key[0] === 'objectives') {
            this.chekTabIndex = 0
            const currentObjectives = this.getObjectivesByUserId(this.userId)
            if (currentObjectives[value[0]]) {
              this.targetType = 'objectives'
              this.targetItem = currentObjectives[value[0]]
              this.targetItemKey = value[0]
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('deletedObjective'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else if (key[0] === 'keyresults') {
            this.chekTabIndex = 0
            const currentKeyresults = this.getKeyresultsByUserId(this.userId)
            console.log('currentKeyresults', currentKeyresults)
            if (currentKeyresults[value[0]]) {
              console.log('currentKeyresults[value]', currentKeyresults)
              this.targetType = 'keyresults'
              this.targetItem = currentKeyresults[value[0]]
              this.targetItemKey = value[0]
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('keyResultDeleted'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else if (key[0] === '1on1s') {
            this.chekTabIndex = 1
            const current1on1s = this.get1on1sByUserId(this.userId)
            if (current1on1s[value[0]]) {
              console.log('current1on1s[value]', current1on1s[value[0]])
              this.targetOneItem = current1on1s[value[0]]
              this.targetOneItemKey = value[0]
              this.targetOneContent = Object.values(this.$route.params.content)[0]
              this.targetType = '1on1s_' + Object.values(this.$route.params.content)[0]
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('beenDeleted'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else if (key[0] === 'rtfbs') {
            this.chekTabIndex = 2
            const currentRtfbs = this.getRtfbsByUserId(this.userId)
            let targetFeedItem = currentRtfbs.filter(x => x.key === value[0])
            if (targetFeedItem.length > 0) {
              this.targetFeed = targetFeedItem[0].feed
              this.targetFeedKey = value[0]
              this.targetUserName = this.getUserById(value[0]).userName
              if (this.getUserById(value[0]).userIcon) {
                this.targetUserIcon = this.getUserById(value[0]).userIcon
              }
              this.targetType = 'rtfbs'
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('fbDeleted'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else {
            this.open = false
          }
          // this.open = true
        } else if (this.$route.params.itemId) {
          const $t = this.$t
          if (this.$route.params.type === 'objectives') {
            const currentObjectives = this.getObjectivesByUserId(this.userId)
            if (currentObjectives[this.$route.params.itemId]) {
              this.targetType = 'objectives'
              this.targetItem = currentObjectives[this.$route.params.itemId]
              this.targetItemKey = this.$route.params.itemId
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('deletedObjective'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else if (this.$route.params.type === 'keyresults') {
            const currentKeyresults = this.getKeyresultsByUserId(this.userId)
            console.log(this.$route.params.itemId)
            if (currentKeyresults[this.$route.params.itemId]) {
              this.targetType = 'keyresults'
              this.targetItem = currentKeyresults[this.$route.params.itemId]
              this.targetItemKey = this.$route.params.itemId
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('keyResultDeleted'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          }
          this.open = false
        }
      }
      this.$route.params.visit = true
    } else {
      // this.$router.push({name: 'Profile'})
    }
  },
  mounted: function () {
    console.log('in mount route params', this.$route.params)
    // console.log(this.$route.params.userId)
    if (this.$route.params.userId) {
      console.log('user:::::::::::::::::::::::', this.$route.params.userId)
      // computedに変える
      this.userId = this.$route.params.userId
      // console.log('this.$route.params.userId', this.$route.params.userId)
      this.setVisit(this.userId)
      const userId = this.userId
      const user = this.getUsersByIds([userId])
      if (user) {
        // console.log('user', user)
        let userInfo = {
          userName: user[userId].userInfo.userName,
          dept: user[userId].userInfo.dept,
          userFeeling: user[userId].userInfo.userFeeling,
          userBio: user[userId].userInfo.userBio,
          userEmail: user[userId].userInfo.userEmail,
          userPhone: user[userId].userInfo.userPhone,
          careerSummary: user[userId].userInfo.careerSummary
        }
        if (user[userId].userInfo.userIcon) {
          userInfo.userIcon = user[userId].userInfo.userIcon
        }
        this.getTargetUser = userInfo
        // this.userInfo.userName = user[userId].userInfo.userName
        // this.userInfo.dept = user[userId].userInfo.dept
        // this.userInfo.userFeeling = user[userId].userInfo.userFeeling
        // this.userInfo.userBio = user[userId].userInfo.userBio
        // this.userInfo.userEmail = user[userId].userInfo.userEmail
        // this.userInfo.userPhone = user[userId].userInfo.userPhone
        // this.userInfo.careerSummary = user[userId].userInfo.careerSummary
        // if (user[userId].userInfo.userIcon) {
        //   this.userInfo.userIcon = user[userId].userInfo.userIcon
        // }
        console.log('this.$route.params.item::::', this.$route.params.item)
        if (this.$route.params.item) {
          const $t = this.$t
          let key = Object.keys(this.$route.params.item)
          let value = Object.values(this.$route.params.item)
          if (key[0] === 'objectives') {
            this.chekTabIndex = 0
            const currentObjectives = this.getObjectivesByUserId(this.userId)
            if (currentObjectives[value[0]]) {
              this.targetType = 'objectives'
              this.targetItem = currentObjectives[value[0]]
              this.targetItemKey = value[0]
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('deletedObjective'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else if (key[0] === 'keyresults') {
            this.chekTabIndex = 0
            const currentKeyresults = this.getKeyresultsByUserId(this.userId)
            console.log('currentKeyresults', currentKeyresults)
            if (currentKeyresults[value[0]]) {
              console.log('currentKeyresults[value]', currentKeyresults)
              this.targetType = 'keyresults'
              this.targetItem = currentKeyresults[value[0]]
              this.targetItemKey = value[0]
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('keyResultDeleted'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else if (key[0] === '1on1s') {
            this.chekTabIndex = 1
            const current1on1s = this.get1on1sByUserId(this.userId)
            if (current1on1s[value[0]]) {
              console.log('current1on1s[value]', current1on1s[value[0]])
              this.targetOneItem = current1on1s[value[0]]
              this.targetOneItemKey = value[0]
              this.targetOneContent = Object.values(this.$route.params.content)[0]
              this.targetType = '1on1s_' + Object.values(this.$route.params.content)[0]
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('beenDeleted'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else if (key[0] === 'rtfbs') {
            this.chekTabIndex = 2
            const currentRtfbs = this.getRtfbsByUserId(this.userId)
            let targetFeedItem = currentRtfbs.filter(x => x.key === value[0])
            if (targetFeedItem.length > 0) {
              this.targetFeed = targetFeedItem[0].feed
              this.targetFeedKey = value[0]
              this.targetUserName = this.getUserById(value[0]).userName
              if (this.getUserById(value[0]).userIcon) {
                this.targetUserIcon = this.getUserById(value[0]).userIcon
              }
              this.targetType = 'rtfbs'
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('fbDeleted'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else {
            this.open = false
          }
          // this.open = true
        } else if (this.$route.params.itemId) {
          const $t = this.$t
          if (this.$route.params.type === 'objectives') {
            const currentObjectives = this.getObjectivesByUserId(this.userId)
            if (currentObjectives[this.$route.params.itemId]) {
              this.targetType = 'objectives'
              this.targetItem = currentObjectives[this.$route.params.itemId]
              this.targetItemKey = this.$route.params.itemId
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('deletedObjective'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          } else if (this.$route.params.type === 'keyresults') {
            const currentKeyresults = this.getKeyresultsByUserId(this.userId)
            console.log(this.$route.params.itemId)
            if (currentKeyresults[this.$route.params.itemId]) {
              this.targetType = 'keyresults'
              this.targetItem = currentKeyresults[this.$route.params.itemId]
              this.targetItemKey = this.$route.params.itemId
              this.open = true
            } else {
              this.$swal({
                title: $t('popTitleStrType'),
                text: $t('keyResultDeleted'),
                type: 'warning',
                animation: false,
                customClass: 'animated fadeInUp',
                // customClass: 'animated flipInX',
                width: '35rem',
                position: 'center',
                // toast: true,
                padding: '2rem',
                timer: 3000
              })
            }
          }
          this.open = false
        }
      }
    } else {
      // this.$router.push({name: 'Profile'})
    }
  },
  beforeRouteUpdate: function (to, from, next) {
    const userId = to.params.userId
    console.log('beforeRouteUpdate::', to.params)
    const user = this.getUsersByIds([userId])
    let userInfo = {
      userName: user[userId].userInfo.userName,
      dept: user[userId].userInfo.dept,
      userFeeling: user[userId].userInfo.userFeeling,
      userBio: user[userId].userInfo.userBio,
      userEmail: user[userId].userInfo.userEmail,
      userPhone: user[userId].userInfo.userPhone,
      careerSummary: user[userId].userInfo.careerSummary
    }
    if (user[userId].userInfo.userIcon) {
      userInfo.userIcon = user[userId].userInfo.userIcon
    }
    this.getTargetUser = userInfo
    // this.userInfo.userName = user[userId].userInfo.userName
    // this.userInfo.dept = user[userId].userInfo.dept
    // this.userInfo.userIcon = user[userId].userInfo.userIcon
    // this.userInfo.userFeeling = user[userId].userInfo.userFeeling
    // this.userInfo.userBio = user[userId].userInfo.userBio
    // this.userInfo.userEmail = user[userId].userInfo.userEmail
    // this.userInfo.userPhone = user[userId].userInfo.userPhone
    // this.userInfo.careerSummary = user[userId].userInfo.careerSummary
    console.log('in before route params', to.params)
    if (to.params.itemId) {
      console.log('user:::::::::::::::::::::::', to.params.userId)
      const $t = this.$t
      if (to.params.type === 'objectives') {
        this.chekTabIndex = 0
        const currentObjectives = this.getObjectivesByUserId(this.userId)
        if (currentObjectives[to.params.itemId]) {
          this.targetType = 'objectives'
          this.targetItem = currentObjectives[to.params.itemId]
          this.targetItemKey = to.params.itemId
          this.open = false
        } else {
          this.$swal({
            title: $t('popTitleStrType'),
            text: $t('deletedObjective'),
            type: 'warning',
            animation: false,
            customClass: 'animated fadeInUp',
            // customClass: 'animated flipInX',
            width: '35rem',
            position: 'center',
            // toast: true,
            padding: '2rem',
            timer: 3000
          })
        }
      } else if (to.params.type === 'keyresults') {
        this.chekTabIndex = 0
        const currentKeyresults = this.getKeyresultById(to.params.itemId, this.userId)
        console.log('currentKeyresults', currentKeyresults)
        if (currentKeyresults[to.params.itemId]) {
          console.log('currentKeyresults[value]', currentKeyresults)
          this.targetType = 'keyresults'
          this.targetItem = currentKeyresults
          this.targetItemKey = to.params.itemId
          this.open = false
        } else {
          this.$swal({
            title: $t('popTitleStrType'),
            text: $t('keyResultDeleted'),
            type: 'warning',
            animation: false,
            customClass: 'animated fadeInUp',
            // customClass: 'animated flipInX',
            width: '35rem',
            position: 'center',
            // toast: true,
            padding: '2rem',
            timer: 3000
          })
        }
      } else if (to.params.type === '1on1s') {
        this.chekTabIndex = 1
        const current1on1s = this.get1on1sByUserId(this.userId)
        if (current1on1s[to.params.itemId]) {
          console.log('current1on1s[value]', current1on1s[to.params.itemId])
          this.targetOneItem = current1on1s
          this.targetOneItemKey = to.params.itemId
          this.targetOneContent = Object.values(to.params.content)[0]
          this.targetType = '1on1s_' + Object.values(to.params.content)[0]
          this.open = true
        } else {
          this.$swal({
            title: $t('popTitleStrType'),
            text: $t('beenDeleted'),
            type: 'warning',
            animation: false,
            customClass: 'animated fadeInUp',
            // customClass: 'animated flipInX',
            width: '35rem',
            position: 'center',
            // toast: true,
            padding: '2rem',
            timer: 3000
          })
        }
      } else if (to.params.type === 'rtfbs') {
        this.chekTabIndex = 2
        const currentRtfbs = this.getRtfbsByUserId(this.userId)
        let targetFeedItem = currentRtfbs.filter(x => x.key === to.params.itemId[0])
        if (targetFeedItem.length > 0) {
          this.targetFeed = targetFeedItem[0].feed
          this.targetFeedKey = to.params.itemId[0]
          this.targetUserName = this.getUserById(to.params.itemId[0]).userName
          if (this.getUserById(to.params.itemId[0]).userIcon) {
            this.targetUserIcon = this.getUserById(to.params.itemId[0]).userIcon
          }
          this.targetType = 'rtfbs'
          this.open = false
        } else {
          this.$swal({
            title: $t('popTitleStrType'),
            text: $t('fbDeleted'),
            type: 'warning',
            animation: false,
            customClass: 'animated fadeInUp',
            // customClass: 'animated flipInX',
            width: '35rem',
            position: 'center',
            // toast: true,
            padding: '2rem',
            timer: 3000
          })
        }
      }
    } else {
      this.open = false
    }
    next()
  },
  methods: {
    ...mapActions('peoples', {
      setVisit: 'SET_VISIT_HISTORY'
    }),
    ...mapActions('okrs/', {
      setProgress: 'SET_ITEM_PROGRESS'
    }),
    ...mapActions('rtfbs/', {
      // VuexFireからのActionを読み込み
      setLikes: 'SET_LIKES',
      removeLikes: 'REMOVE_LIKES'
    }),
    updateShowMore: function (value) {
      this.propShowMore = value
    },
    updateContentHeight: function (value) {
      this.propContentHeight = value
    },
    updateCarrerShowMore: function (value) {
      this.carrerShowMore = value
    },
    updateCarrerContentHeight: function (value) {
      this.carrerContentHeight = value
    },
    updateProgressInfo: function (value) {
      const $t = this.$t
      const $swal = this.$swal
      $swal({
        title: $t('popTitleStrType'),
        text: $t('confirmUpdateProgressStr'),
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#f64846',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        reverseButtons: false,
        animation: false,
        customClass: 'animated fadeInUp',
        // customClass: 'animated flipInX',
        width: '35rem',
        position: 'center',
        // toast: true,
        allowOutsideClick: false,
        padding: '2rem'
        // timer: 3000
      }).then((result) => {
        if (result.value) {
          this.targetItem.progress = String(value)
          this.setProgress({
            target: this.targetType,
            id: this.targetItemKey,
            progress: String(value)
          })
        } else {
          this.$refs.progress.back(Number(this.targetItem.progress))
        }
        console.log('--2', value)
      })
    },
    // ここらへんをcomputedで返すようにする？
    setTarget: function (value) {
      if (value.targetType === 'objectives' || value.targetType === 'keyresults') {
        // this.targetType = value.targetType
        // this.targetItem = value.targetItem
        // this.targetItemKey = value.targetItemKey
        this.getTargetObjective = value
      } else if (value.targetType.match(/1on1s_/)) {
        // this.targetOneItem = value.targetOneItem
        // this.targetOneItemKey = value.targetOneItemKey
        // this.targetOneContent = value.targetContent
        // this.targetType = value.targetType
        this.getTargetOneItem = value
      } else if (value.targetType === 'rtfbs') {
        // this.targetFeed = value.targetFeed
        // this.targetFeedKey = value.targetFeedKey
        // this.targetUserName = value.targetUserName
        // this.targetUserIcon = value.targetUserIcon
        // this.targetType = value.targetType
        this.getTargetFbRequest = value
      }
      this.open = true
    },
    setEdit: function () {
      // 編集中データをセット
      this.editInfo = {
        userName: this.userInfo.userName,
        dept: this.userInfo.dept,
        userFeeling: this.userInfo.userFeeling,
        userBio: this.userInfo.userBio,
        userEmail: this.userInfo.userEmail,
        userPhone: this.userInfo.userPhone,
        careerSummary: this.userInfo.careerSummary
      }
      if (this.userInfo.userIcon) {
        this.editInfo.userIcon = this.userInfo.userIcon
      }
      console.log(this.editInfo)
      this.edit = !this.edit
    },
    updateFeeling: function (value) {
      // コンディションの変更
      if (this.edit) {
        this.editInfo.userFeeling = value
      } else {
        this.setFeeling(value)
      }
    },
    // プロフィール画像プロップ処理
    onFileTypeMismatch (file) {
      const $t = this.$t
      this.swal({
        text: $t('orderFileUploadStr'),
        type: 'waning',
        animation: false,
        customClass: 'animated pulse'
      })
      // alert('jpg, gif, png形式でアップして下さい。')
    },
    // onFileSizeExceed (file) {
    //   const $t = this.$t
    //   this.$swal({
    //     text: $t('order2mbFileStr'),
    //     type: 'warning',
    //     animation: false,
    //     customClass: 'animated pulse'
    //   })
    //   // alert('ファイルは2mb以下でアップロードして下さい。')
    // },
    uploadResizedPhoto () {
      var date = moment()
      var profileImageUrl = date.format('1+YYYY/MM/DD HH:mm') + '.jpg'
      const storageProfilePhotoRef = storage.ref('profilepictures')
      const path = profileImageUrl
      const photoImagesRef = storageProfilePhotoRef.child(path)
      this.myCroppa.generateBlob((blob) => {
        photoImagesRef.put(blob)
          .then((snapshot) => {
            const photoURL = snapshot.downloadURL
            this.editInfo.userIcon = photoURL
          })
          .catch((err) => {
            console.log('upload error:', err)
          })
      })
    },
    updateProfile: function () {
      // プロフィール更新処理
      if (this.$v.editInfo.userName.nameValidation) {
        this.setProfile(this.editInfo)
        this.edit = !this.edit
      }
    },
    setParentCommentId: function (value) {
      this.replyParent = value
      this.$refs.setReply.setContentTextByParent(value.item, value.id)
    },
    getDetail: function (value) {
      console.log('objective value', value)
      this.userId = value.userId
      this.$router.push({ name: 'User', params: { userId: value.userId, type: value.type, itemId: value.itemId } })
    },
    showCommentForm () {
      this.isShowCommentForm = true
    },
    notShowCommentForm () {
      this.isShowCommentForm = false
    },
    onClickStarNotLiked: function (feed, key) {
      this.setLikes({
        key: key,
        userId: this.getUserId
      })
    },
    onClickStarLiked: function (feed, key) {
      this.removeLikes({
        key: key,
        userId: this.getUserId
      })
    },
    isLiked: function (feed) {
      if (!feed.likes) {
        return false
      } else {
        return Object.keys(feed.likes).filter(x => x === this.getUserId).length !== 0
      }
    }
  },
  filters: {
    preparedTime: function (date) {
      return moment(date * 1000).format('YYYY/MM/DD HH:mm')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
