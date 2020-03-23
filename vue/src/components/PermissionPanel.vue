<template>
  <div
    class="permission-panel"
  >
    <table
      border
    >
      <tr>
        <th>{{$t('rights.guestRights')}}</th>
        <th>{{$t('rights.userRights')}}</th>
        <!-- No column for Admin rights because Admins have all permissions -->
      </tr>
      <tr>
        <td>
          <div class="wrapper">
            <div class="rights">
              <!-- Guest rights -->
              <form>
                <input type="checkbox" id="gPublic" name="gPublic" value="gPublic">
                <label for="gPublic">{{$t('rights.publicBoards')}}</label>
                <br>
                <input type="checkbox" id="gPrivate" name="gPrivate" value="gPrivate">
                <label for="gPrivate">{{$t('rights.privateBoards')}}</label>
                <br>
                <input type="checkbox" id="gCreate" name="gCreate" value="gCreate">
                <label for="gCreate">{{$t('rights.createBoards')}}</label>
                <br>
                <input type="checkbox" id="gDeleteBoards" name="gDeleteBoards" value="gDeleteBoards">
                <label for="gDeleteBoards">{{$t('rights.deleteBoards')}}</label>
                <br>
                <input type="checkbox" id="gNotes" name="gNotes" value="gNotes">
                <label for="gNotes">{{$t('rights.postNotes')}}</label>
                <br>
                <input type="checkbox" id="gImages" name="gImages" value="gImages">
                <label for="gImages">{{$t('rights.postImages')}}</label>
                <br>
                <input type="checkbox" id="gFiles" name="gFiles" value="gFiles">
                <label for="gFiles">{{$t('rights.postFiles')}}</label>
                <br>
                <input type="checkbox" id="gDeletePosts" name="gDeletePosts" value="gDeletePosts">
                <label for="gDeletePosts">{{$t('rights.deletePosts')}}</label>
              </form>
            </div>
          </div>
        </td>
        <td>
          <div class="wrapper">
            <div class="rights">
              <!-- User rights -->
              <form>
                <input type="checkbox" id="uPublic" name="uPublic" value="uPublic">
                <label for="uPublic">{{$t('rights.publicBoards')}}</label>
                <br>
                <input type="checkbox" id="uPrivate" name="uPrivate" value="uPrivate">
                <label for="uPrivate">{{$t('rights.privateBoards')}}</label>
                <br>
                <input type="checkbox" id="uCreate" name="uCreate" value="uCreate">
                <label for="uCreate">{{$t('rights.createBoards')}}</label>
                <br>
                <input type="checkbox" id="uDeleteBoards" name="uDeleteBoards" value="uDeleteBoards">
                <label for="uDeleteBoards">{{$t('rights.deleteBoards')}}</label>
                <br>
                <input type="checkbox" id="uNotes" name="uNotes" value="uNotes">
                <label for="uNotes">{{$t('rights.postNotes')}}</label>
                <br>
                <input type="checkbox" id="uImages" name="uImages" value="uImages">
                <label for="uImages">{{$t('rights.postImages')}}</label>
                <br>
                <input type="checkbox" id="uFiles" name="uFiles" value="uFiles">
                <label for="uFiles">{{$t('rights.postFiles')}}</label>
                <br>
                <input type="checkbox" id="uDeletePosts" name="uDeletePosts" value="uDeletePosts">
                <label for="uDeletePosts">{{$t('rights.deletePosts')}}</label>
                <br>
                <input type="checkbox" id="uPolls" name="uPolls" value="uPolls">
                <label for="uPolls">{{$t('rights.postPolls')}}</label>
                <br>
                <input type="checkbox" id="uSurveys" name="uSurveys" value="uSurveys">
                <label for="uSurveys">{{$t('rights.postSurveys')}}</label>
                <br>
                <input type="checkbox" id="uLike" name="uLike" value="uLike">
                <label for="uLike">{{$t('rights.like')}}</label>
                <br>
                <input type="checkbox" id="uComment" name="uComment" value="uComment">
                <label for="uComment">{{$t('rights.comment')}}</label>
              </form>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Submission button -->
    <br>
    <input type="submit" :value="$t('ui.adopt')">
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'

export default {
  name: 'PermissionPanel',
  components: {
  },
  data () {
    return {
      guestPermissions: {
        public: true,
        private: false,
        createBoards: false,
        deleteBoards: false,
        postNotes: false,
        postImages: false,
        postFiles: false,
        deletePosts: false
      },
      userPermissions: {
        public: true,
        private: true,
        createBoards: false,
        deleteBoards: false,
        postNotes: true,
        postImages: true,
        postFiles: true,
        deletePosts: true,
        createPolls: true,
        createSurveys: true,
        like: false,
        comment: false
      }
    }
  }
}
</script>

<style scoped>
  table {
    width: 100%;
  }

  th, td {
    text-align: center;
    padding: 0px 20px;
    vertical-align: top;
  }

  label {
    margin-left: 10px;
  }

  .wrapper {
    display: inline-block;
  }

  .rights {
    display: block;
    text-align: left;
  }
</style>
