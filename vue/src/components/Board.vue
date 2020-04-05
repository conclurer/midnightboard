<template>
  <div class="board">
    <!-- Displays content when editor is not displayed -->
    <div
      class="inner-board"
      v-if="!this.editorActive"
      :key="editorActive"
    >
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
    </div>

    <!-- Displays content when editor is displayed -->
    <div
      class="inner-board"
      v-if="this.editorActive"
      style="display: grid; grid-template-columns: 1fr 500px;"
    >
      <div
        class="content"
        v-masonry
        transition-duration="0.4s"
        item-selector=".item"
        style="grid-column: 1 / 2;"
        :key="editorActive"
      >
        <div
          v-for="note in notes.slice().reverse()"
          :key="note.index"
          v-masonry-tile
          class="item"
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
              v-bind:src="'data:image/jpeg;base64,'+note.content"
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
              v-bind:src="'data:image/png;base64,'+note.content"
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
              <a v-bind:href="'data:application/pdf;base64,' + note.content" :download="note.title + 'pdf'">{{$t('board.download.pdf')}}</a>
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
            v-if="note.typeOfPost === 'application/msexcel'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-excel" size="10x"/><br><br>
              <a v-bind:href="'data:application/msexcel;base64,' + note.content" :download="note.title + '.xls'">{{$t('board.download.excel')}}</a>
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
            v-if="note.typeOfPost === 'application/mspowerpoint'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-powerpoint" size="10x"/><br><br>
              <a v-bind:href="'data:application/mspowerpoint;base64,' + note.content" :download="note.title + '.ppt'">{{$t('board.download.powerpoint')}}</a>
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

      <!-- Display right bar -->
      <div
        class="rightBar"
      >
        <div>
          <div v-smoothscrollbar="{ listener, options }">
            <EditorSidebar
              @add-note="addNote"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EditorSidebar from '@/components/EditorSidebar.vue'
import pdf from 'vue-pdf'

export default {
  name: 'Board',
  components: {
    EditorSidebar,
    pdf
  },
  data () {
    return {
      refreshBoard: false,
      listener: () => {},
      options: {},
      pollResultMap: [], // links to pollAVVPMap
      pollAVVPMap: [], // links to pollAnswers/pollVotes/pollVotesPercent
      pollAnswers: [],
      pollVotes: [],
      pollVotesPercent: [],
      participatedPosts: [] // PostIds of posts user has participated
    }
  },
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
    addNote: async function () {
      // Notify notice board
      this.$emit('add-note')
    },
    // TODO:
    initPoll: async function (postId) {
      this.$log.debug(postId)
      // Add poll to result map
      this.pollResultMap[postId] = this.pollAVVPMap.length
      this.participatedPosts[postId] = false
      // Axios GET for current votes
      await axios
        .get('http://localhost:1337/api/polls/' + postId, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
            'Content-Type': 'application/json'
          }
        }
        )
        .then(response => {
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
          // Needed for array change detection
          this.pollAnswers.push('')
          this.pollAnswers.pop()
          this.pollVotes.push('')
          this.pollVotes.pop()
          this.pollVotesPercent.push('')
          this.pollVotesPercent.pop()
          // Show result for this poll
          this.participatedPosts[postId] = true
          // Also needed for array change detection
          this.participatedPosts.push('')
          this.participatedPosts.pop()
          this.refreshBoard = !this.refreshBoard
        })
        .catch(err => {
          if (err.status.code !== 404) {
            this.$log.error(err)
          }
        })
    },
    votePoll: async function (element) {
      const postId = element.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
      // Axios PUT to update votes for the answer
      var answerIds = []
      for (const child of element.target.parentElement.parentElement.parentElement.firstChild.firstChild.children) {
        if (child.firstChild.firstChild.checked === true) {
          const answerId = child.firstChild.firstChild.id.split('aidx')[1] // rb-202036175036182-aidx0 -> 0
          answerIds.push(answerId)
        }
      }
      if (answerIds.length <= 0) {
        alert(this.$t('board.poll.invalidVote'))
      } else {
        for (const answerId of answerIds) {
          const jsonBody = JSON.stringify({
            postId: postId,
            answerId: answerId
          })

          await axios
            .put('http://localhost:1337/api/polls', jsonBody, {
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
                'Content-Type': 'application/json'
              }
            }
            )
            .then(res => {})
            .catch(err => this.$log.error(err))
        }
        this.initPoll(postId)
      }
    },
    showResult: function (element) {
      // Show current results
      const postId = element.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
      this.initPoll(postId)
    },
    submitSurvey: async function (element) {
      const postId = element.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
      // Axios PUT to submit survey
      var questionIds = []
      var questionId
      var answers = []
      var currentAnswers = []
      for (const forms of element.target.parentElement.firstChild.children) {
        if (forms.lastChild.type === 'text' || forms.lastChild.type === 'textarea') {
          questionIds.push(forms.lastChild.id.split('qidx')[1])
          answers.push(forms.lastChild.value)
        } else {
          for (const form of forms.children) {
            if (form.firstChild.children.childElementCount > 0) {
              questionId = form.firstChild.firstChild.id.split('qidx')[1].split('-aidx')[0]
              if (form.firstChild.firstChild.type === 'radio' && form.firstChild.firstChild.checked) {
                questionIds.push(questionId)
                answers.push(form.firstChild.firstChild.labels[0].textContent)
              } else if (form.firstChild.firstChild.type === 'checkbox' && form.firstChild.firstChild.checked) {
                // Check for multiple answers
                if (questionIds.includes(questionId)) {
                  const idx = questionIds.indexOf(questionId)
                  if (Array.isArray(answers[idx])) {
                    currentAnswers = answers[idx]
                  } else {
                    currentAnswers = Array.of(answers[idx])
                  }
                  currentAnswers.push(form.firstChild.firstChild.labels[0].textContent)
                  answers[idx] = currentAnswers
                } else {
                  questionIds.push(questionId)
                  answers.push(form.firstChild.firstChild.labels[0].textContent)
                }
              }
            }
          }
        }
      }
      if (questionIds.length > answers.length) {
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
  },
  props: ['notes', 'editorActive']
}
</script>

<style scoped>
  .board {
    position: sticky;
    width: 100%;
    min-height: 100vh;
    background: var(--background-board);
    display: grid;
    grid-auto-rows: min-content;
  }

  .inner-board {
    grid-row: 1 / 2;
  }

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

  .rightBar {
    grid-column: 2 / 3;
    width: 500px;
    height: 100%;
    position: fixed;
    right: 0px;
    background: #fff;
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
