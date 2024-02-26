pipeline {
  agent any
  stages {
    stage('start') {
      parallel {
        stage('start') {
          steps {
            echo 'build began'
          }
        }

        stage('') {
          steps {
            echo 'test parallel stages'
          }
        }

      }
    }

  }
}