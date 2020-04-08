<template>
  <div
    class="content"
    v-masonry
    transition-duration="0.4s"
    item-selector=".item"
    :key="refreshBoard"
  >
    <div
      v-for="note in notes.slice().reverse()"
      :key="note.index"
      v-masonry-tile
      class="item"
      :updateKey="refreshBoard"
    >
      <!-- Display common text notes -->
      <b-card
        v-if="note.typeOfPost === 'application/note'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-text>
          <div v-html="note.content" />
        </b-card-text>
      </b-card>

      <!-- Display images of type JPEG -->
      <b-card
        v-if="note.typeOfPost === 'image/jpeg'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-img
          v-bind:src="'data:image/jpeg;base64,' + note.content"
        >
        </b-card-img>
        <a v-bind:href="'data:image/jpeg;base64,' + note.content" :download="note.title + '.jpeg'">{{$t('board.download.image')}}</a>
      </b-card>

      <!-- Display images of type PNG -->
      <b-card
        v-if="note.typeOfPost === 'image/png'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-img
          v-bind:src="'data:image/png;base64,' + note.content"
        >
        </b-card-img>
        <a v-bind:href="'data:image/png;base64,' + note.content" :download="note.title + '.png'">{{$t('board.download.image')}}</a>
      </b-card>

      <!-- Display PDF as preview and link -->
      <b-card
        v-if="note.typeOfPost === 'application/pdf'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        style="min-height: 745px;"
        :title="note.title"
        :key="editorActive"
      >
        <hr />
        <b-card-text>
          <pdf :src="'data:application/pdf;base64,' + note.content" style="height: 585;"></pdf>
          <a v-bind:href="'data:application/pdf;base64,' + note.content" :download="note.title + '.pdf'">{{$t('board.download.pdf')}}</a>
        </b-card-text>
      </b-card>

      <!-- Display Word 97-2003 document as link -->
      <b-card
        v-if="note.typeOfPost === 'application/msword'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-text>
          <font-awesome-icon icon="file-word" size="10x"/><br><br>
          <a v-bind:href="'data:application/msword;base64,' + note.content" :download="note.title + '.doc'">{{$t('board.download.word')}}</a>
        </b-card-text>
      </b-card>

      <!-- Display Word document as link -->
      <b-card
        v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-text>
          <font-awesome-icon icon="file-word" size="10x"/><br><br>
          <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + note.content" :download="note.title + '.docx'">{{$t('board.download.word')}}</a>
        </b-card-text>
      </b-card>

      <!-- Display Excel 97-2003 spreadsheet as link -->
      <b-card
        v-if="note.typeOfPost === 'application/vnd.ms-excel'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-text>
          <font-awesome-icon icon="file-excel" size="10x"/><br><br>
          <a v-bind:href="'data:application/vnd.ms-excel;base64,' + note.content" :download="note.title + '.xls'">{{$t('board.download.excel')}}</a>
        </b-card-text>
      </b-card>

      <!-- Display Excel spreadsheet as link -->
      <b-card
        v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-text>
          <font-awesome-icon icon="file-excel" size="10x"/><br><br>
          <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + note.content" :download="note.title + '.xlsx'">{{$t('board.download.excel')}}</a>
        </b-card-text>
      </b-card>

      <!-- Display PowerPoint 97-2003 presentation as link -->
      <b-card
        v-if="note.typeOfPost === 'application/vnd.ms-powerpoint'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-text>
          <font-awesome-icon icon="file-powerpoint" size="10x"/><br><br>
          <a v-bind:href="'data:application/vnd.ms-powerpoint;base64,' + note.content" :download="note.title + '.ppt'">{{$t('board.download.powerpoint')}}</a>
        </b-card-text>
      </b-card>

      <!-- Display PowerPoint presentation as link -->
      <b-card
        v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-text>
          <font-awesome-icon icon="file-powerpoint" size="10x"/><br><br>
          <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,' + note.content" :download="note.title + '.pptx'">{{$t('board.download.powerpoint')}}</a>
        </b-card-text>
      </b-card>

      <!-- Display polls -->
      <b-card
        v-bind:id="note.id"
        v-if="note.typeOfPost === 'application/poll'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-text>
          <div v-if="!participatedPosts[note.id]">
            <b-form class="d-flex flex-column">
              <div v-html="note.content" />
              <br>
              <b-button-group>
                <b-button
                  variant="primary"
                  class="voteButton"
                  @click="votePoll"
                >
                  {{$t('board.poll.vote')}}
                </b-button>
                <b-button
                  variant="info"
                  class="showResultButton"
                  @click="showResult"
                >
                  {{$t('board.poll.showResult')}}
                </b-button>
              </b-button-group>
            </b-form>
          </div>
          <div v-else-if="participatedPosts[note.id]">
            <div class="bar-chart">
              <ul class="chart-horizontal">
                <div
                  v-for="index of pollAVVPMap[pollResultMap[note.id]]"
                  :key="index"
                >
                  <b>{{ pollVotesPercent[index] }}% ({{ pollVotes[index] }} {{$tc('board.poll.votes',pollVotes[index])}})</b>
                  <li class="chart-bar" :style="{width: pollVotesPercent[index] + '%'}">
                    <span class="chart-label">
                      {{ pollAnswers[index] }}
                    </span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </b-card-text>
      </b-card>

      <!-- Display surveys -->
      <b-card
        v-bind:id="note.id"
        v-if="note.typeOfPost === 'application/survey'"
        class="note"
        bg-variant="dark"
        text-variant="white"
        :title="note.title"
      >
        <hr />
        <b-card-text>
          <div v-if="!participatedPosts[note.id]">
            <b-form class="d-flex flex-column">
              <div v-html="note.content" />
              <br>
              <b-button
                variant="primary"
                class="submitButton"
                  @click="submitSurvey"
                >
                  {{$t('board.survey.submit')}}
                </b-button>
              </b-form>
            </div>
          <div v-else-if="participatedPosts[note.id]">
            <h4>{{$t('board.survey.thankYou')}}</h4>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import pdf from 'vue-pdf'

export default {
  name: 'Board',
  components: {
    pdf
  },
  data () {
    return {
      refreshBoard: false,
      pollResultMap: [], // links to pollAVVPMap
      pollAVVPMap: [], // links to pollAnswers/pollVotes/pollVotesPercent
      pollAnswers: [],
      pollVotes: [],
      pollVotesPercent: [],
      participatedPosts: [] // PostIds of posts user has participated
    }
  },
  props: ['notes', 'updateKey'],
  created () {
    // Check for voted polls and submitted surveys
    axios
      .get('http://localhost:1337/api/users/participations', {
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
          'Content-Type': 'application/json'
        }
      }
      )
      .then(response => {
        response.data.postIds.forEach(postId => {
          this.participatedPosts[postId] = true
          // Check if post is poll
          this.initPoll(postId)
        })
        this.refreshBoard = !this.refreshBoard
      })
      .catch(err => this.$log.error(err))
  },
  methods: {
    initPoll: async function (postId) {
      // Axios GET for current votes (if post is not a poll ignore it)
      await axios
        .get('http://localhost:1337/api/polls/' + postId, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
            'Content-Type': 'application/json'
          }
        }
        )
        .then(response => {
          // Add poll to result map
          this.pollResultMap[postId] = this.pollAVVPMap.length
          this.participatedPosts[postId] = false
          const votes = response.data.votes
          const answers = response.data.answers
          var votesNumber = []
          var votesPercent = []
          var votesSum = 0
          // Calculate sum of votes
          votes.forEach(vote => {
            votesSum += vote
          })
          for (const vote of votes) {
            var votePercent = 0
            if (votesSum > 0) {
              votePercent = (vote / votesSum) * 100
            }
            votesNumber.push(vote)
            votesPercent.push(votePercent.toFixed(2))
          }
          // Check if map has indices for this poll
          if (this.pollAVVPMap[this.pollResultMap[postId]]) {
            this.pollAVVPMap[this.pollResultMap[postId]].forEach(function (index, counter) {
              this.pollAnswers[index] = answers[counter]
              this.pollVotes[index] = votesNumber[counter]
              this.pollVotesPercent[index] = votesPercent[counter].toFixed(2)
            })
          } else {
            // No indices in map
            var indices = []
            answers.forEach(answer => {
              indices.push(this.pollAnswers.length)
              this.pollAnswers.push(answer)
            })
            votesNumber.forEach(voteNumber => {
              this.pollVotes.push(voteNumber)
            })
            votesPercent.forEach(votePercent => {
              this.pollVotesPercent.push(votePercent)
            })
            this.pollAVVPMap[this.pollResultMap[postId]] = indices
          }
          // Show result for this poll
          this.participatedPosts[postId] = true
          this.refreshBoard = !this.refreshBoard
        })
        .catch(err => {
          if (err.response.status !== 404) {
            this.$log.error(err)
          }
        })
    },
    votePoll: async function (element) {
      const postId = element.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
      // Axios PUT to update votes for the answer
      var answerIds = []
      for (const forms of element.target.parentElement.parentElement.firstChild.children) {
        const inputForm = forms.firstChild.firstChild
        if (inputForm.checked === true) {
          const answerId = inputForm.id.split('aidx')[1] // rb-202036175036182-aidx0 -> 0
          answerIds.push(answerId)
        }
      }
      if (answerIds.length <= 0) {
        alert(this.$t('board.poll.invalidVote'))
      } else {
        const jsonBody = JSON.stringify({
          postId: postId,
          answerIds: answerIds
        })
        await axios
          .put('http://localhost:1337/api/polls', jsonBody, {
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
              'Content-Type': 'application/json'
            }
          }
          )
          .then(res => this.initPoll(postId))
          .catch(err => this.$log.error(err))
      }
    },
    showResult: async function (element) {
      // Show current results
      const postId = element.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
      this.initPoll(postId)
    },
    submitSurvey: async function (element) {
      const postId = element.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
      // Axios PUT to submit survey
      var missingValues = false
      var questionIds = []
      var questionId
      var answers = []
      var currentAnswers = []
      for (const forms of element.target.parentElement.firstChild.children) {
        const textChild = forms.lastChild
        if (textChild.type === 'text' || textChild.type === 'textarea') {
          questionIds.push(textChild.id.split('qidx')[1])
          if (textChild.value !== '') {
            answers.push(textChild.value)
          } else {
            missingValues = true
            break
          }
        } else {
          for (const form of forms.children) {
            if (form.firstChild.childElementCount > 0) {
              const checkChild = form.firstChild.firstChild
              if (checkChild.type === 'radio' && checkChild.checked) {
                answers.push(checkChild.labels[0].textContent)
              } else if (checkChild.type === 'checkbox' && checkChild.checked) {
                // Check for multiple answers
                if (questionIds.includes(questionId)) {
                  const idx = questionIds.indexOf(questionId)
                  if (Array.isArray(answers[idx])) {
                    currentAnswers = answers[idx]
                  } else if (answers[idx]) {
                    currentAnswers = Array.of(answers[idx])
                  } else {
                    currentAnswers = []
                  }
                  currentAnswers.push(checkChild.labels[0].textContent)
                  answers[idx] = currentAnswers
                } else {
                  questionIds.push(questionId)
                  answers.push(checkChild.labels[0].textContent)
                }
              }
            } else {
              // <p> child
              const nextChild = form.nextSibling.firstChild.firstChild
              questionId = nextChild.id.split('qidx')[1].split('-aidx')[0]
              questionIds.push(questionId)
            }
          }
        }
      }
      // Need to calculate the corret answer length
      // MCQs falsify the result of answers.length
      var answerLength = 0
      answers.forEach(answer => {
        if (Array.isArray(answer)) {
          answerLength++
        } else {
          answerLength++
        }
      })
      if (questionIds.length !== answerLength || missingValues) {
        alert(this.$t('board.survey.invalidSubmit'))
      } else {
        const jsonBody = JSON.stringify({
          postId: postId,
          questionIds: questionIds,
          answers: answers
        })
        // Send PUT request
        await axios
          .put('http://localhost:1337/api/surveys', jsonBody, {
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
              'Content-Type': 'application/json'
            }
          }
          )
          .then(res => {})
          .catch(err => this.$log.error(err))
        // Set survey in submitted state
        this.participatedPosts[postId] = true
        this.refreshBoard = !this.refreshBoard
      }
    }
  }
}
</script>

<style scoped>
  hr {
    height: 1px;
    border: none;
    background-color: #aaa;
  }

  li {
    display: list-item;
  }

  ul {
    text-align: left;
  }

  a {
    color: var(--link);
  }

  .content {
    position: static;
    margin: 10px 10px;
  }

  .note {
    width: 480px;
    margin: 10px;
  }

  .chart-horizontal {
    height: 100%;
    position: relative;
    list-style: none;
  }

  .chart-bar {
    height: 30px;
    margin-bottom: 10px;

    background: linear-gradient(to left, #4cb8c4, #3cd3ad);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .chart-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    line-height: 30px;
    color: rgb(255, 255, 255);
  }
</style>
