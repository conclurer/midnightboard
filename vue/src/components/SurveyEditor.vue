<template>
  <div class="surveyEditor">
    <br>
    <h2>{{$t('editor.survey.heading')}}</h2>
    <b-form-input
      class="surveyTitle"
      v-bind:input="surveyTitle"
      v-on:input="surveyTitle = $event"
      :placeholder="this.$t('editor.survey.title')"
      :maxlength="maxSurveyTitleLength"
    />
    <div v-if="surveyQuestions.length >= 0">
      <div
        v-for="(question, index) in surveyQuestions"
        :key="index"
      >
        <hr/>
        <!-- Remove button with question -->
        <b-row>
          <b-col cols="1">
            <b-button
              variant="danger"
              @click="removeQuestion(index)"
            >
              <font-awesome-icon icon="minus"/>
            </b-button>
          </b-col>
          <b-col cols="10">
          <b-form-input
            v-bind:input="surveyQuestions[index]"
            v-on:input="surveyQuestions[index] = $event"
            :placeholder="$t('editor.survey.templateQuestion')"
            :maxlength="maxSurveyInputFieldQuestionLength"
          />
          </b-col>
        </b-row>
        <br>
        <!-- Regular input field questions -->
        <div v-if="surveyQuestionType[index] === 'IFQ'">
          <b-form-input
            v-bind:value="surveyQuestionElement[index]"
            v-on:input="surveyQuestionElement[index] = $event"
            :placeholder="$t('editor.survey.templateAnswer')"
            :maxlength="maxSurveyInputFieldAnswerLength"
          />
        </div>
        <!-- Regular input field questions -->
        <div v-else-if="surveyQuestionType[index] === 'TAQ'">
          <b-form-textarea
            id="textarea-default"
            v-bind:input="surveyQuestionElement[index]"
            v-on:input="surveyQuestionElement[index] = $event"
            :placeholder="$t('editor.survey.templateAnswer')"
            :maxlength="maxSurveyTextAreaAnswerLength"
          >
          </b-form-textarea>
        </div>
        <!-- Single/Multiple-Choice-Questions -->
        <div v-else-if="surveyQuestionType[index] === 'MCQ'">
          <b-container>
            <div
              v-for="(answer, answerIndex) in surveyQuestionElement[index]"
              :key="answerIndex"
            >
              <b-row>
                <b-col>
                  <b-form-group>
                    <b-form-checkbox disabled/>
                  </b-form-group>
                </b-col>
                <b-col cols="8">
                  <b-form-input
                    v-bind:input="answer"
                    v-on:input="answer = $event"
                    :placeholder="$t('editor.survey.templateAnswer')"
                    :maxlength="maxSurveyChoiceAnswerLength"
                  >
                  </b-form-input>
                </b-col>
                <b-col>
                  <b-button
                    variant="danger"
                    @click="removeChoiceAnswer(answerIndex, index)"
                  >
                  <font-awesome-icon icon="minus"/>
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </b-container>
          <br>
          <b-button
            variant="primary"
            class="surveyAddChoiceButton"
            @click="addChoiceAnswer(index)"
          >
          <font-awesome-icon icon="plus"/>
          </b-button>
          <br>
          <b-form-checkbox
            v-model="allowMultipleVotes[index]"
            value="true"
            unchecked-value="false"
          >
            {{$t('editor.survey.allowMultipleVotes')}}
          </b-form-checkbox>
        </div>
        <br>
      </div>
      <br>
    </div>
    <h4>{{$t('editor.survey.questionWith')}}</h4>
    <b-button-group>
      <b-button
        variant="primary"
        class="surveyAddInputFieldQuestion"
        @click="addInputFieldQuestion()"
      >
      {{$t('editor.survey.addInputFieldQuestion')}}
      </b-button>
      <b-button
        variant="primary"
        class="surveyAddTextAreaQuestion"
        @click="addTextAreaQuestion()"
      >
      {{$t('editor.survey.addTextAreaQuestion')}}
      </b-button>
      <b-button
        variant="primary"
        class="surveyAddMultipleChoiceQuestion"
        @click="addMultipleChoiceQuestion()"
      >
      {{$t('editor.survey.addMultipleChoiceQuestion')}}
      </b-button>
    </b-button-group>
    <hr>
    <b-button
      variant="secondary"
      class="postButton"
      @click="createSurvey()"
    >
      {{$t('editor.survey.post')}}
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'surveyEditor',
  data () {
    return {
      surveyTitle: this.$t('editor.survey.title'),
      // Index of surveyQuestions links to the other arrays
      surveyQuestions: [this.$t('editor.survey.templateQuestion'), 'What did you do yesterday?', 'What is you favorite color?'],
      /*
        InputFieldQuestion: IFQ
        TextAreaQuestion: TAQ
        MultipleChoiceQuestion: MCQ
      */
      surveyQuestionType: ['IFQ', 'TAQ', 'MCQ'],
      surveyQuestionElement: ['', '', ['', '']],
      allowMultipleVotes: [null, null, false],
      maxSurveyTitleLength: 50,
      maxSurveyInputFieldQuestionLength: 40,
      maxSurveyInputFieldAnswerLength: 35,
      maxSurveyTextAreaAnswerLength: 200,
      maxSurveyChoiceAnswerLength: 30,
      surveyContent: ''
    }
  },
  methods: {
    addInputFieldQuestion () {
      this.allowMultipleVotes.push(null)
      this.surveyQuestions.push('')
      this.surveyQuestionType.push('IFQ')
      this.surveyQuestionElement.push('')
    },
    addTextAreaQuestion () {
      this.allowMultipleVotes.push(null)
      this.surveyQuestions.push('')
      this.surveyQuestionType.push('TAQ')
      this.surveyQuestionElement.push('')
    },
    addMultipleChoiceQuestion () {
      this.allowMultipleVotes.push(false)
      this.surveyQuestions.push('')
      this.surveyQuestionType.push('MCQ')
      this.surveyQuestionElement.push([''])
    },
    removeQuestion (questionIndex) {
      this.allowMultipleVotes.splice(questionIndex, 1)
      this.surveyQuestions.splice(questionIndex, 1)
      if (this.surveyQuestionType[questionIndex] === 'MCQ') {
        this.surveyQuestionType.splice(questionIndex, 1)
        this.surveyQuestionElement.splice(questionIndex, 1)
      } else {
        this.surveyQuestionType.splice(questionIndex, 1)
        this.surveyQuestionElement.splice(questionIndex, 1)
      }
    },
    addChoiceAnswer (questionIndex) {
      this.surveyQuestionElement[questionIndex].push('')
      this.$log.debug(this.surveyQuestionElement)
    },
    removeChoiceAnswer (answerIndex, questionIndex) {
      this.surveyQuestionElement[questionIndex].splice(answerIndex, 1)
      this.$log.debug(this.surveyQuestionElement)
    },
    createSurvey () {
      if (this.surveyTitle === '') {
        alert(this.$t('editor.survey.missingTitle'))
      } else {
        /*
        var index = 0
        // var validAnswers = []
        // Need unique checkbox name for single vote surveys
        var checkBoxName = ''
        if (!this.allowMultipleVotes[index]) {
          const birthday = new Date()
          const yearM = birthday.getFullYear() + '-'
          const monthM = birthday.getMonth() + '-'
          const dayM = birthday.getDay() + '-'
          const time = birthday.getHours() + '' + birthday.getMinutes() + '' +
          birthday.getSeconds() + '' + birthday.getMilliseconds()
          checkBoxName = 'cb-' + yearM + monthM + dayM + time
        }
        // 2 or more answers = valid survey
        if (this.surveyChoiceAnswers.length <= 1) {
          alert(this.$t('editor.survey.missingAnswers'))
        } else {
          this.surveyContent = '<div class="container">'
          this.surveyChoiceAnswers.forEach(surveyAnswer => {
            const answer = surveyAnswer
            if (answer !== '') {
              validAnswers.push(index)
              this.surveyContent += '<div class="row justify-content-flex-start"><div class="align-self-center">' +
              '<input type="checkbox" name="' + checkBoxName + '" id="' + index +
              '"></div><div class="col-sm-auto"><b>' + answer + '</b></div></div>'
              index++
            }
          })
          this.surveyContent += '</div>'
          if (validAnswers.length <= 1) {
            alert(this.$t('editor.survey.missingAnswers'))
            this.surveyContent = ''
          } else {
            this.$emit('create-survey', this.surveyTitle, this.surveyContent, validAnswers)
          }
        }
        */
        alert('WIP!')
      }
    }
  }
}
</script>

<style scoped>
  .surveyTitle {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .surveyAddChoiceButton {
    width: 45%;
  }

  .postButton {
    width: auto;
  }
</style>
